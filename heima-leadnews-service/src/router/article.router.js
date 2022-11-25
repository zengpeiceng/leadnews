const Router = require("koa-router");

const articleRouter = new Router({ prefix: "/" });
const { verifyAuth } = require("../middleware/auth.middleware");
const { verifyPermission } = require("../middleware/article.middleware");
const {
  submitArticle,
  getArticlById,
  getArticles,
  delArticle,
  changeArticleEnable,
  showArticleRelativeMsg,
  showArticleDetail,
  toExamine
} = require("../controller/article.controller");

// 发表文章
articleRouter.post("wemedia/article/submit", verifyAuth, submitArticle);
// 通过id获取一个文章
articleRouter.get("wemedia/article/one/:id", getArticlById);
// 获取内容列表
articleRouter.post("wemedia/article/list", verifyAuth, getArticles);
// 删除文章
articleRouter.delete(
  "wemedia/article_delete/:id",
  verifyAuth,
  verifyPermission,
  delArticle
);
// 上架或下架
articleRouter.post("wemedia/article/down_or_up", verifyAuth, changeArticleEnable);


// admin
// 文章列表（搜索、分页）
articleRouter.post("weadmin/article/list", verifyAuth, showArticleRelativeMsg);
// 获取单个文章详情
articleRouter.get("weadmin/article/one/:id", verifyAuth, showArticleDetail);
// 审核
articleRouter.post("weadmin/article/examine", verifyAuth, toExamine);
articleRouter.post("weadmin/article/down_or_up", verifyAuth, changeArticleEnable);
module.exports = articleRouter;
