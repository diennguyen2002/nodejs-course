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
      const { privateKey, publicKey } = await crypto.generateKeyPairSync(
        "rsa",
        {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "spki",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
          },
        }
      );

      console.log("Generated Public Key:", publicKey);
      console.log("Generated Private Key:", privateKey);

      const publicKeyString = await KeyTokenService.createKeyToken({
        shopId: newShop._id,
        publicKey,
        privateKey,
      });

      if (!publicKeyString) {
        throw new InternalServerError("Error creating key token");
      }

      console.log("Public Key String:", publicKeyString);
      //const publicKeyObject = crypto.createPublicKey(publicKeyString);
      //console.log("Public Key Object:", publicKeyObject);

      const tokenPair = await createTokenPair(
        { shopId: newShop._id, email },
        publicKeyString,
        privateKey
      );

      console.log("Token Pair:", tokenPair);

      return {
        status: "success",
        metadata: {
          shop: getInfoData(newShop, ["_id", "name", "email"]),
          tokens: tokenPair,
        },
      };
    }
  };
}

module.exports = ShopService;
