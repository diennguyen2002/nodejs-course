const mongoose = require("mongoose");
const { countConnections } = require("../helpers/check.connect");
const MAX_POOL_SIZE = 10;

const connectString = "mongodb://localhost:27017/myshop";

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (1 === 1) {
      // Enable debug mode for development
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString, {
        maxPoolSize: MAX_POOL_SIZE,
      })
      .then(() => {
        console.log("Connected to MongoDB");
        countConnections();
      })
      .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

module.exports = Database.getInstance();
