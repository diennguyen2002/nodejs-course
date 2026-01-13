const express = require("express");
const route = express.Router();

route.use("/api/v1/shop", require("./shop"));

module.exports = route;
