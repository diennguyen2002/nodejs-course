const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");

class ShopService {
  // Service methods will be implemented here
  static register = async ({ name, email, mobile, password }) => {
    // Registration logic
    try {
      const existed = await shopModel.findOne({ email }).lean();
      if (existed) {
        return {
          status: "error",
          message: "Shop already exists",
        };
      }

      // Logic for registering a shop
      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        mobile,
        password: passwordHash,
      });

      return {
        shop: {
          id: newShop._id,
          name: newShop.name,
          email: newShop.email,
          mobile: newShop.mobile,
        },
      };
    } catch (error) {
      console.error("Error registering shop:", error);
      return {
        status: "error",
        message: error.message,
      };
    }
  };
}

module.exports = ShopService;
