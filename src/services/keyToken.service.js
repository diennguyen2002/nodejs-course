const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
  // Service methods will be implemented here
  static createKeyToken = async ({ shopId, publicKey, privateKey }) => {
    // Logic for creating a key token
    try {
      const keyToken = await keyTokenModel.create({
        user: shopId,
        publicKey: publicKey.toString(),
        privateKey: privateKey.toString(),
      });
      return keyToken ? keyToken.publicKey : null;
    } catch (error) {
      return { error };
    }
  };
}

module.exports = KeyTokenService;
