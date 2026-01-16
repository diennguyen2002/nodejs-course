// !dmbgum
const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      default: ["0000"],
    },
  },
  {
    timestamps: true,
    collection: "shops",
  }
);

//Export the model
module.exports = mongoose.model("Shop", shopSchema);
