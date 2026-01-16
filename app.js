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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database connection
require("./src/dbs/init.mongodb");
//checkOverload();

// Route handlers would go here
app.use("/", require("./src/routes"));

// Error handling middleware would go here
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500);
  //console.error("Looi:", error);
  return res.json({
    status: "error",
    code: error.statusCode || 500,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
