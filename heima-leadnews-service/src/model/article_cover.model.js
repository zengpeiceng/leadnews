const { DataTypes, Model } = require("sequelize");
const sequelize = require("../app/db");
const Article = require("./article.model");

class ArticleCover extends Model{}
ArticleCover.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  articleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Article,
      key: "id"
    }
  }
}, {
  sequelize,
  tableName: "article_cover",
  timestamps: false
})
module.exports = ArticleCover;