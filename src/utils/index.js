const _ = require("lodash");
const crypto = require("crypto");

const getInfoData = (data, keys) => {
  return _.pick(data, keys);
};

const createPublicPrivateKey = () => {
  // Logic to create public and private keys
  const keys = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });
  return keys;
};

module.exports = {
  getInfoData,
  createPublicPrivateKey,
};
