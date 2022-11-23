const ArticleCover = require("../model/article_cover.model");

class ArticleCoverDao {
  async saveArticleCover(articleId, url) {
    const res = ArticleCover.create({
      articleId,
      url
    })
    return res;
  }
  async deleteCoverById(articleId) {
    const res = await ArticleCover.destroy({
      where: {
        articleId
      }
    })
    return res;
  }
}

module.exports = new ArticleCoverDao();