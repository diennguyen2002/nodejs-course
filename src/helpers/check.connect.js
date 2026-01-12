const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECONDS = 5000;

// count number of connections
const countConnections = () => {
  const connections = mongoose.connections.length;
  console.log(`Current number of mongoose connections: ${connections}`);
};

// check over load
const checkOverload = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numOs = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss / (1024 * 1024); // in MB
    const maxConnections = numOs * 5; // example threshold

    console.log(`Active Connections: ${numConnections}`);
    console.log(`Memory Usage (RSS): ${memoryUsage.toFixed(2)} MB`);

    if (numConnections > maxConnections) {
      console.warn(
        `Warning: High number of connections detected! (${numConnections} connections, max allowed is ${maxConnections})`
      );
    }
  }, _SECONDS);
};

module.exports = {
  countConnections,
  checkOverload,
};
