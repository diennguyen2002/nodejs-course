const app = require("./app");
const {
  app: { port },
} = require("./src/configs/init.config");
const PORT = port || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on APP_PORT ${PORT}`);
});
