const ArticleDao = require("../dao/article.dao");
const ArticleCoverDao = require("../dao/article_cover.dao");
const { success } = require("../app/response");
class ArticleController {
  // media端
  // 上传文章
  async submitArticle(ctx, next) {
    const userId = ctx.user.id;
    const id = ctx.request.body.id;
    if (!id) {
      // 保存
      const articleId = await ArticleDao.saveArticle({
        ...ctx.request.body,
        userId,
      });
      if (ctx.request.body.images.length > 0) {
        for (const url of ctx.request.body.images) {
          const res = await ArticleCoverDao.saveArticleCover(articleId, url);
        }
      }
    } else {
      // 编辑
      const articleId = await ArticleDao.updateArticle({
        ...ctx.request.body,
        userId,
      });
      // 先删除封面
      const res = await ArticleCoverDao.deleteCoverById(id);
      // 再保存
      if (ctx.request.body.images.length > 0) {
        const images = ctx.request.body.images;
        images.forEach(async (url) => {
          await ArticleCoverDao.saveArticleCover(id, url);
        });
      }
    }
    success(ctx, "SUCCESS", "发布成功", 200, null);
  }
  async getArticlById(ctx, next) {
    const id = ctx.request.params.id;
    const res = await ArticleDao.getArticlById(id);
    const data = res.map((item) => {
      // 处理封面（默认返回对象数组，这里我返回字符串数组
      const imgs = item.dataValues.images.map((i) => {
        return i?.url;
      });
      item.dataValues.images = imgs;
      return item.dataValues;
    });
    success(ctx, data, "SUCCESS", 200, null);
  }
  // 获取素材文章(全部)
  async getArticles(ctx, next) {
    const { list, total } = await ArticleDao.getArticles(ctx.request.body);

    const data = list.map((item) => {
      // 添加reason
      if (
        item.dataValues.publishTime >= Date.now() &&
        item.dataValues.status != 0 &&
        item.enable != 0 &&
        item.dataValues.type != 0
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
  async delArticle(ctx, next) {
    const id = ctx.request.params.id;
    const res = await ArticleDao.delArticle(id);
    success(ctx, "SUCCESS", "删除成功", 200, null);
  }
  // 上架、下架
  async changeArticleEnable(ctx, next) {
    const { id, enable } = ctx.request.body;
    const res = await ArticleDao.changeArticleEnable(id, enable);
    success(ctx, "SUCCESS", "操作成功", 200, null);
  }
  // admin 
  // article列表
  async showArticleRelativeMsg(ctx, next) {
    const res = await ArticleDao.showArticleRelativeMsg(ctx.request.body);
    const total = res.total;
    const data = res.data.map((item) => {
      const imgs = item.dataValues.images.map((i) => {
        return i?.url;
      });
      item.dataValues.images = imgs;
      // 处理autherName
      const authorName = item.dataValues?.author?.dataValues?.name;
      item.dataValues.authorName = authorName;
      delete item.dataValues.author;
      return item.dataValues;
    });
    success(ctx, data, "SUCCESS", 200, null, total);
  }
  async showArticleDetail(ctx, next) {
    const id = ctx.request.params?.id;
    const res = await ArticleDao.showArticleDetail(id);
    const imgs = res.images.map(i => {
      return i?.url
    })
    res.images = imgs;
    const authorName = res?.author?.dataValues?.name;
    res.authorName = authorName;
    delete res.author;
    success(ctx, res, "SUCCESS", 200, null)
  }
}

module.exports = new ArticleController();
