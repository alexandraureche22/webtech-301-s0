const sequelize = require("../sequelize");
const { DataTypes } = require("sequelize");

const Course = sequelize.define("course", {
  courseName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 50],
    },
  },
});

module.exports = Course;
