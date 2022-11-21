const ArticleService = require("../service/article.services");
class ArticleController {
  // 上传文章
  async submitArticle(ctx, next) {

    const result = await ArticleService.saveArticle(ctx.request.body)

    ctx.body = {
      host: null,
      code: 200,
      data: "SUCCESS",
      message: "发布成功"
    }
  }
  // 获取素材文章(全部)
  async getArticles(ctx, next) {
    const result = await ArticleService.getArticle();
    ctx.body = {
      host: null,
      code: 200,
      data: result,
      message: "SUCCESS"
    }
  }
}

module.exports= new ArticleController();