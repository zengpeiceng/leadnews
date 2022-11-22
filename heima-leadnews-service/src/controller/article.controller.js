const ArticleDao = require("../dao/article.dao");
const ArticleCoverDao = require("../dao/article_cover.dao");
const { success } = require("../app/response");
class ArticleController {
  // 上传文章
  async submitArticle(ctx, next) {
    const userId = ctx.user.id;
    const articleId = await ArticleDao.saveArticle({
      ...ctx.request.body,
      userId,
    });
    for (const url of ctx.request.body.images) {
      const res = await ArticleCoverDao.saveArticleCover(articleId, url);
    }
    success(ctx, "SUCCESS", "发布成功", 200, null)
  }
  // 获取素材文章(全部)
  async getArticles(ctx, next) {
    const result = await ArticleDao.getArticles(ctx.request.body);
    success(ctx, result, "SUCCESS", 200, null);
  }
}

module.exports = new ArticleController();
