const { DataTypes, Model } = require("sequelize");
const sequelize = require("../app/db");
const User = require("./user.model");
const Channel = require("./channel.model");
const ArticleCover = require("./article_cover.model");

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
  }
}, {
  sequelize,
  tableName: "article",
  timestamps: false
})
Article.hasMany(ArticleCover, {
  foreignKey: "articleId",
  // 关联别名，在子查询时字段为images(在子查询includes时也配置as)
  as: 'images'
})
module.exports = Article;