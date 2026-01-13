const shopService = require("../services/shop.service");

class ShopController {
  // Define methods for shop controller here
  async register(req, res) {
    await shopService.register(req, res);
  }
}

module.exports = new ShopController();
