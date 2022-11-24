const { DataTypes, Model } = require("sequelize");
const sequelize = require("../app/db");

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNuLL: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNuLL: false,
    },
    avatar_url: {
      type: DataTypes.STRING,
      allowNuLL: true,
    },
  },
  {
    sequelize,
    tableName: "user",
    timestamps: false,
  }
);
// User.hasMany(Material, {
//   foreignKey: "userId",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });
// User.hasMany(Article, {
//   foreignKey: "userId",
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// })
module.exports = User;
