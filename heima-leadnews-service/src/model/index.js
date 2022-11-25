const User = require("./user.model");
const Article = require("./article.model")
const ArticleCover = require("./article_cover.model")
const Material = require("./material.model")
const Channel = require("./channel.model");
const Sensitive = require("./sensitive.model");

User.hasMany(Article, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
})
Article.belongsTo(User, {
  foreignKey: "userId",
  as: "author",
})

User.hasMany(Material, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
})
Material.belongsTo(User, {
  foreignKey: "userId"
})

Article.hasMany(ArticleCover, {
  foreignKey: "articleId",
  as: "images",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
})
ArticleCover.belongsTo(Article, {
  foreignKey: "articleId"
})
Channel.hasMany(Article, {
  foreignKey: "channelId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
})
Article.belongsTo(Channel, {
  foreignKey: "channelId"
})

module.exports = {
  User,
  Article,
  ArticleCover,
  Material,
  Channel,
  Sensitive
}

