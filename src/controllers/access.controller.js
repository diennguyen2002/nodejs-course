const { some } = require("lodash");
const {
  CreatedResponse,
  SuccessResponse,
} = require("../core/success.response");
const accessService = require("../services/access.service");

class AccessController {
  // Define methods for shop controller here
  register = async (req, res) => {
    new CreatedResponse({
      message: "Shop registered successfully",
      metadata: await accessService.register(req.body),
      options: { someOption: true },
    }).send(res);
  };

  login = async (req, res) => {
    new SuccessResponse({
      message: "Shop logged in successfully",
      metadata: await accessService.login(req.body),
    }).send(res);
  };

  logout = async (req, res) => {
    //console.log("Logging out with keyStore:", req.keyStore);
    new SuccessResponse({
      message: "Logout successfully",
      metadata: await accessService.logout(req.keyStore),
    }).send(res);
  };
}

module.exports = new AccessController();
