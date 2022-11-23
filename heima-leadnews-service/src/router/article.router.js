const Router = require("koa-router");

const articleRouter = new Router({ prefix: "/" });
const { verifyAuth } = require("../middleware/auth.middleware");
const { verifyPermission } = require("../middleware/article.middleware");
const {
  submitArticle,
  getArticles,
  delArticle,
} = require("../controller/article.controller");

// 发表文章
articleRouter.post("wemedia/article/submit", verifyAuth, submitArticle);
// 获取内容列表
articleRouter.post("wemedia/article/list", verifyAuth, getArticles);
// 删除文章
articleRouter.delete(
  "wemedia/article_delete/:id",
  verifyAuth,
  verifyPermission,
  delArticle
);

module.exports = articleRouter;
