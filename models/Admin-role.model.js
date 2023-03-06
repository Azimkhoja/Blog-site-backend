const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const AdminRole = sequelize.define(
  "admin_roles",
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: false, freezeTableName: true }
);

module.exports = AdminRole;
