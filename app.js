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
checkOverload();

// Route handlers would go here
app.use("/", require("./src/routes"));

// Error handling middleware would go here

module.exports = app;
