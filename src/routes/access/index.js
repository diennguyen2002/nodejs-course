const express = require("express");
const route = express.Router();
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../auth/checkAuth");

route.post("/register", asyncHandler(accessController.register));
route.post("/login", asyncHandler(accessController.login));

module.exports = route;
