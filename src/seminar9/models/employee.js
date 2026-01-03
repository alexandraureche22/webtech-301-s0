const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,

      // MODIFICARE NOUĂ: VALIDARE LUNGIME NUME

      validate: {
        len: [3, 10], // Numele trebuie să aibă între 3 și 10 caractere
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    birthYear: {
      type: DataTypes.INTEGER,
      min: 1900,
    },

    //  CÂMPUL SALARY

    salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0, // Validarea: valoarea minimă permisă este 0
      },
    },
  }
  // { tableName: "Employees" }
);

module.exports = Employee;
