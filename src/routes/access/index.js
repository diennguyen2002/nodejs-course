const express = require("express");
const route = express.Router();
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

route.post("/register", asyncHandler(accessController.register));
route.post("/login", asyncHandler(accessController.login));

// authentication routes
route.use(authentication);

route.post("/logout", asyncHandler(accessController.logout));

module.exports = route;
