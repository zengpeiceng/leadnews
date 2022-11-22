const { DataTypes, Model } = require("sequelize");
const sequelize = require("../app/db");
const User = require("./user.model");

class Material extends Model {}
Material.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id"
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isCollection: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "material",
    timestamps: false,
  }
);

// Material.belongsTo(User, {
//   foreginKey: "userId",
//   targetKey: "id"
// });

module.exports = Material;
