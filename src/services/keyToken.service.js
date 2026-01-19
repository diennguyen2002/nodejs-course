const keyTokenModel = require("../models/keyToken.model");
const { Types } = require("mongoose");

class KeyTokenService {
  // Service methods will be implemented here
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    // Logic for creating a key token
    try {
      // Nếu chưa có thì tạo mới, có rồi thì update
      const tokens = await keyTokenModel.findOneAndUpdate(
        { user: userId },
        { publicKey, privateKey, usedRefreshTokens: [], refreshToken },
        { upsert: true, new: true }
      );
      return tokens.publicKey;
    } catch (error) {
      return { error };
    }
  };

  static findByUserId = async (userId) => {
    return await keyTokenModel.findOne({ user: userId }).lean();
  };

  static removeKeyById = async (id) => {
    return await keyTokenModel.deleteOne({ _id: id });
  };
}

module.exports = KeyTokenService;
