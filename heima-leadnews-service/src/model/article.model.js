const { DataTypes, Model } = require("sequelize");
const sequelize = require("../app/db");
const User = require("./user.model");
const Channel = require("./channel.model");

class Article extends Model{};
Article.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  channelId: {
    type: DataTypes.INTEGER,
    references: {
      model: Channel,
      key: "id"
    }
  },
  type:{
    type: DataTypes.STRING
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id"
    }
  },
  content: {
    type: DataTypes.TEXT,
  },
  labels:{
    type: DataTypes.INTEGER
  },
  status: {
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING
  },
  publishTime: {
    type: DataTypes.DATE
  },
  enable: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  createdTime: {
    type: DataTypes.DATE,
    defaultValue: Date.now()
  }
}, {
  sequelize,
  tableName: "article",
  timestamps: false
})

module.exports = Article;