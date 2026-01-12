const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();

// Middleware to parse JSON bodies
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// Route handlers would go here
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
// Error handling middleware would go here

module.exports = app;
