const sequelize = require("../app/db");
const { DataTypes, Model } = require("sequelize");

class Sensitive extends Model{};
Sensitive.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdTime: {
    type: DataTypes.DATE,
    defaultValue: Date.now()
  }
}, {
  sequelize,
  tableName: "sensitive",
  timestamps: false,
})

module.exports = Sensitive;