require("dotenv").config();

const DB = process.env.DB;

module.exports = {

  // development: {
  //   client: 'sqlite3',
  //   useNullAsDefault: true,
  //   connection: {
  //     filename: './database/foodtruck.db3'
  //   },
  //   pool: {
  //     afterCreate: (conn, done) => {
  //       conn.run("PRAGMA foreign_keys = ON", done);
  //     },
  //   },
  //   migrations: {
  //     directory: "./database/migrations",
  //   },
  //   seeds: {
  //     directory: "./database/seeds",
  //   },
  // },

  production: {
    client: "pg",
    connection: DB,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: { directory: "./database/seeds" },
  }
};
