const { findById } = require("../services/apiKey.service");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(401).json({ message: "API key is missing" });
    }

    const apiKeyData = await findById(key);
    if (!apiKeyData) {
      return res.status(401).json({ message: "Invalid API key" });
    }

    req.apiKey = apiKeyData;
    next();
  } catch (error) {
    console.error("Error in API key middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const permission = (requiredPermission) => {
  return (req, res, next) => {
    try {
      const apiKeyData = req.apiKey;
      if (!apiKeyData || !apiKeyData.permissions.includes(requiredPermission)) {
        return res
          .status(403)
          .json({ message: "Forbidden: insufficient permissions" });
      }
      next();
    } catch (error) {
      console.error("Error in permission middleware:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};

const asyncHandler = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

module.exports = {
  apiKey,
  permission,
  asyncHandler,
};
