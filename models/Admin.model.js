const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const AdminRole = require("./Admin-role.model");

const Admin = sequelize.define(
  "admins",
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    hash_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role_id: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

// Admin.hasMany(AdminRole);
// AdminRole.belongsTo(Admin, {
//   foreignKey: "role_id",
// });
module.exports = Admin;
