const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");
const route = express.Router();

//check api key
//route.use(apiKey);
//check permission
//route.use(permission("0000"));

route.use("/api/v1/shop", require("./access"));

module.exports = route;
