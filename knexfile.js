require("dotenv").config();

const DB = process.env.DB;

module.exports = {

  development: {
    client: "pg",
    connection: DB,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: { directory: "./database/seeds" },
  },

  production: {
    client: "pg",
    connection: DB,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: { directory: "./database/seeds" },
  }
};
