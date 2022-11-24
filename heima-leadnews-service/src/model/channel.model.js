const { DataTypes, Model } = require("sequelize");
const sequelize = require("../app/db");

class Channel extends Model {}
Channel.init(
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
    description: {
      type: DataTypes.STRING,
      allowNuLL: true,
    },
    ord: {
      type: DataTypes.INTEGER,
      allowNuLL: false,
      defaultValue: 1,
    },
    isDefault: {
      type: DataTypes.INTEGER,
      allowNuLL: false,
      defaultValue: 1,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNuLL: false,
      defaultValue: 1,
    },
    createdTime: {
      type: DataTypes.DATE,
      defaultValue: Date.now()
    }
  },
  {
    sequelize,
    tableName: "channel",
    timestamps: false,
  }
);
module.exports = Channel;
