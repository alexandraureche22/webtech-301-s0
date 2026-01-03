const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ".seminar9/sqlite/test.db",
});

module.exports = sequelize;
