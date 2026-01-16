const { some } = require("lodash");
const {
  CreatedResponse,
  SuccessResponse,
} = require("../core/success.response");
const shopService = require("../services/access.service");

class AccessController {
  // Define methods for shop controller here
  register = async (req, res) => {
    new CreatedResponse({
      message: "Shop registered successfully",
      metadata: await shopService.register(req.body),
      options: { someOption: true },
    }).send(res);
  };

  login = async (req, res) => {
    new SuccessResponse({
      message: "Shop logged in successfully",
      metadata: await shopService.login(req.body),
    }).send(res);
  };
}

module.exports = new AccessController();
