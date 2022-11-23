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
    success(ctx, "SUCCESS", "发布成功", 200, null);
  }
  // 获取素材文章(全部)
  async getArticles(ctx, next) {
    const { list, total } = await ArticleDao.getArticles(ctx.request.body);

    const data = list.map((item) => {
      // 添加reason
      if (
        item.dataValues.publishTime >= Date.now() &&
        item.dataValues.status != 0 && item.enable != 0 && item.dataValues.type != 0
      ) {
        item.dataValues.reason = "待发布";
      } else if (item.dataValues.status == 9) {
        item.dataValues.reason = "已发表";
      } else {
        item.dataValues.reason = null;
      }

      // 处理封面（默认返回对象数组，这里我返回字符串数组
      const imgs = item.dataValues.images.map((i) => {
        return i?.url;
      });
      item.dataValues.images = imgs;
      return item.dataValues;
    });
    success(ctx, data, "SUCCESS", 200, null, total);
  }
}

module.exports = new ArticleController();
