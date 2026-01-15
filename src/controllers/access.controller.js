const shopService = require("../services/access.service");

class AccessController {
  // Define methods for shop controller here
  register = async (req, res) => {
    res.status(200).json(await shopService.register(req.body));
  };
}

module.exports = new AccessController();
