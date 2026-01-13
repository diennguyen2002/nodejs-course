const dev = {
  app: { port: process.env.DEV_APP_PORT || 3000 },
  db: {
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    name: process.env.DEV_DB_NAME,
  },
};

const prod = {
  app: { port: process.env.PROD_APP_PORT || 8080 },
  db: {
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_HOST,
    name: process.env.PROD_DB_HOST,
  },
};

const config = { dev, prod };
const env = process.env.NODE_ENV || "dev";

module.exports = config[env];
