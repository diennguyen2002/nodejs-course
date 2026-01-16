const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
  // Service methods will be implemented here
  static createKeyToken = async ({
    shopId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    // Logic for creating a key token
    try {
      // Nếu chưa có thì tạo mới, có rồi thì update
      const tokens = await keyTokenModel.findOneAndUpdate(
        { user: shopId },
        { publicKey, privateKey, usedRefreshTokens: [], refreshToken },
        { upsert: true, new: true }
      );
      return tokens.publicKey;
    } catch (error) {
      return { error };
    }
  };
}

module.exports = KeyTokenService;
