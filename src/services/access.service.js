const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair, verifyJWT } = require("../auth/authUtils");
const { getInfoData, createPublicPrivateKey } = require("../utils");
const {
  BadRequestError,
  InternalServerError,
  ForbiddenError,
} = require("../core/error.response");
const { findByEmail } = require("./shop.service");

class AccessService {
  static handleRefreshToken = async (refreshToken) => {
    // Check if the refresh token has been used before
    const foundToken = await KeyTokenService.findByRefreshTokenUsed(
      refreshToken
    );

    // If found, it indicates potential token reuse
    if (foundToken) {
      const { userId, mail } = await verifyJWT(
        refreshToken,
        foundToken.publicKey
      );
      console.log("Potential token reuse detected for user:", { userId, mail });

      // Invalidate all tokens for this user
      await KeyTokenService.deleteKeyById(userId);
      throw new ForbiddenError(
        "Refresh token has been reused. All sessions invalidated."
      );
    } else {
      // Normal flow: check if the refresh token exists in the store
      const holderToken = await KeyTokenService.findByRefreshToken(
        refreshToken
      );
      if (!holderToken)
        throw new UnauthorizedError("Refresh token not found in store");

      const { userId, email } = await verifyJWT(
        refreshToken,
        holderToken.publicKey
      );

      // Verify user existence
      const shop = findByEmail({ email });
      if (!shop) throw new UnauthorizedError("Shop not found");

      // Generate new token pair
      const tokenPair = await createTokenPair(
        { userId, email },
        holderToken.publicKey,
        holderToken.privateKey
      );

      // Update the key store with the new refresh token and mark the old one as used
      holderToken.refreshToken = tokenPair.refreshToken;
      holderToken.usedRefreshTokens.push(refreshToken);
      await holderToken.save();

      return {
        user: { userId, email },
        tokens: tokenPair,
      };
    }
  };

  // Create new token pair
  static logout = async (keyStore) => {
    console.log("Key store to logout:", keyStore);
    const delKey = await KeyTokenService.removeKeyById(keyStore._id);
    return delKey;
  };

  static login = async ({ email, password, refreshToken = null }) => {
    const existedShop = await shopModel.findOne({ email }).lean();
    if (!existedShop) {
      throw new BadRequestError("Shop does not exist");
    }

    const match = await bcrypt.compare(password, existedShop.password);
    if (!match) {
      throw new BadRequestError("Bad request");
    }

    const { publicKey, privateKey } = createPublicPrivateKey();

    const tokenPair = await createTokenPair(
      { userId: existedShop._id, email },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      userId: existedShop._id,
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
      const { publicKey, privateKey } = createPublicPrivateKey();

      console.log("Generated Public Key:", publicKey);
      console.log("Generated Private Key:", privateKey);

      const tokenPair = await createTokenPair(
        { userId: newShop._id, email },
        publicKey,
        privateKey
      );

      console.log("Token Pair:", tokenPair);

      const publicKeyString = await KeyTokenService.createKeyToken({
        userId: newShop._id,
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

module.exports = AccessService;
