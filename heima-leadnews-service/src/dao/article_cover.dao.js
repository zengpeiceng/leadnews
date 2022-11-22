const ArticleCover = require("../model/article_cover.model");

class ArticleCoverDao {
  async saveArticleCover(articleId, url) {
    const res = ArticleCover.create({
      articleId,
      url
    })
    return res;
  }
}

module.exports = new ArticleCoverDao();