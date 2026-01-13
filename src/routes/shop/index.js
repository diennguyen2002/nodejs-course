const express = require("express");
const route = express.Router();
const shopController = require("../../controllers/shop.controller");

route.post("/register", shopController.register);

module.exports = route;
