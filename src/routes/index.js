const express = require("express");
const shopModel = require("../models/shop.model");
const shopController = require("../controllers/shop.controller");
const route = express.Router();

route.post("/register", shopController.register);

module.exports = route;
