const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const {
  BadRequestError,
  InternalServerError,
} = require("../core/error.response");

class ShopService {
  static login = async ({ email, password, refreshToken = null }) => {
    const existedShop = await shopModel.findOne({ email }).lean();
    if (!existedShop) {
      throw new BadRequestError("Shop does not exist");
    }

    const match = await bcrypt.compare(password, existedShop.password);
    if (!match) {
      throw new BadRequestError("Bad request");
    }

    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const tokenPair = await createTokenPair(
      { shopId: existedShop._id, email },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      shopId: existedShop._id,
      publicKey,
      privateKey,
      refreshToken: tokenPair.refreshToken,
    });

    return {
      shop: getInfoData(existedShop, ["_id", "name", "email"]),
      tokens: tokenPair,
    };
  };

  // Service methods will be implemented here
  static register = async ({ name, email, password }) => {
    // Registration logic
    const existed = await shopModel.findOne({ email }).lean();
    if (existed) {
      throw new BadRequestError("Shop already exists");
    }

    // Logic for registering a shop
    const passwordHash = await bcrypt.hash(password, 10);
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
    });

    if (newShop) {
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      console.log("Generated Public Key:", publicKey);
      console.log("Generated Private Key:", privateKey);

      const tokenPair = await createTokenPair(
        { shopId: newShop._id, email },
        publicKey,
        privateKey
      );

      console.log("Token Pair:", tokenPair);

      const publicKeyString = await KeyTokenService.createKeyToken({
        shopId: newShop._id,
        publicKey,
        privateKey,
        refreshToken: tokenPair.refreshToken,
      });

      console.log("Stored Public Key String:", publicKeyString);

      if (!publicKeyString) {
        throw new InternalServerError("Error creating key token");
      }

      return {
        shop: getInfoData(newShop, ["_id", "name", "email"]),
        tokens: tokenPair,
      };
    }
  };
}

module.exports = ShopService;
