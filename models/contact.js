const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.POSTGRESQL_DB_URI);

const Contact = sequelize.define("Contact", {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  zipCode: DataTypes.INTEGER,
  country: DataTypes.STRING,
  phone: DataTypes.BIGINT,
  email: DataTypes.STRING,
  category: DataTypes.STRING,
});

module.exports = Contact;
