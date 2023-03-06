const Category = require("./Category.model");

const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Post = sequelize.define(
  "posts",
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_link: {
      type: DataTypes.STRING,
    },
    category_id: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);
// Post.hasMany(Category , {as: "category"} );
// Category.belongsTo(Post, {
//   foreignKey: "category_id",
//   as: "category"
// });
module.exports = Post;
