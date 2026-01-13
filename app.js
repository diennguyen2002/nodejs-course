require("dotenv").config();
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const { checkOverload } = require("./src/helpers/check.connect");
const app = express();

// Middleware to parse JSON bodies
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// Initialize database connection
require("./src/dbs/init.mongodb");
checkOverload();

// Route handlers would go here
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Error handling middleware would go here

module.exports = app;
