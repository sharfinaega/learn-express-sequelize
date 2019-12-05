require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: "127.0.0.1",
    dialect: "mysql"
    // operatorsAliases: false
  },

  // SUDAH TIDAK PERLU
  // test: {
  //   username: "root",
  //   password: null,
  //   database: "database_test",
  //   host: "127.0.0.1",
  //   dialect: "mysql",
  //   operatorsAliases: false
  // }

  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
    // operatorsAliases: false
  }
};
