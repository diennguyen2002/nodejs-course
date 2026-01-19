const JWT = require("jsonwebtoken");
const asyncHandler = require("../helpers/asyncHandler");
const { UnauthorizedError } = require("../core/error.response");
const KeyTokenService = require("../services/keyToken.service");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

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

const authentication = asyncHandler(async (req, res, next) => {
  // Implementation here
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId)
    throw new UnauthorizedError("Invalid request! No client ID provided");

  console.log("Authenticating user ID:", userId);

  const keyStore = await KeyTokenService.findByUserId(userId);
  if (!keyStore)
    throw new UnauthorizedError("Invalid request! No key store found");

  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken)
    throw new UnauthorizedError("Invalid request! No access token provided");

  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
    if (userId !== decodeUser.userId)
      throw new UnauthorizedError("Invalid request! User ID mismatch");

    console.log("keyStore------:", keyStore);

    req.keyStore = keyStore;
    req.user = decodeUser;
    return next();
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createTokenPair,
  authentication,
};
