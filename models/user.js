const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.POSTGRESQL_DB_URI);

const User = sequelize.define("User", {
  username: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: DataTypes.STRING,
});

// User.sync().then(() => {
//   console.log("User Model synced");
// });

module.exports = User;
