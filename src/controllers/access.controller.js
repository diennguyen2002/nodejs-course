const shopService = require("../services/access.service");

class ShopController {
  // Define methods for shop controller here
  register = async (req, res) => {
    try {
      console.log("P::register::body request:", req.body);
      res.status(200).json(await shopService.register(req.body));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new ShopController();
