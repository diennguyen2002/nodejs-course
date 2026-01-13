const shopModel = require("../models/shop.model");

class ShopService {
  // Service methods will be implemented here
  async register(req, res) {
    // Registration logic
    try {
      console.log("body request:", req.body);
      const existed = await shopModel.findOne({ email: req.body.email });
      if (existed) {
        throw new Error("Mobile already exists");
      }
      // Logic for registering a shop
      await shopModel.create(req.body);

      return res.status(200).json({ message: "Shop registered successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ShopService();
