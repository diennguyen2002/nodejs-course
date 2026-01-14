const express = require("express");
const route = express.Router();
const shopController = require("../../controllers/access.controller");

route.post("/register", shopController.register);

module.exports = route;
