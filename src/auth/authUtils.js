const JWT = require("jsonwebtoken");

const createTokenPair = async (payload, publicKey, privateKey) => {
  // Implementation here
  try {
    const accessToken = JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });

    const refreshToken = JWT.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error("Error verifying access token:", err);
      } else {
        console.log("Decoded access token:", decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {
    return { error };
  }
};

module.exports = { createTokenPair };
