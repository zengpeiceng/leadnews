const ArticleService = require("../service/article.services");
class ArticleController {
  async submitArticle(ctx, next) {
    const result = await ArticleService.saveArticle(ctx.request.body)

    ctx.body = {
      host: null,
      code: 200,
      data: "SUCCESS",
      message: "操作成功"
    }
  }
}

module.exports= new ArticleController();