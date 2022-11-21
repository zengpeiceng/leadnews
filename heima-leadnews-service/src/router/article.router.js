const Router = require("koa-router");

const articleRouter = new Router({prefix: "/"});
const { verifyAuth } = require("../middleware/auth.middleware");
const { submitArticle, getArticles } = require("../controller/article.controller");

// 发表文章
articleRouter.post("wemedia/article/submit", verifyAuth, submitArticle);
// 获取内容列表
articleRouter.get("wemedia/article/list", verifyAuth, getArticles);

module.exports = articleRouter;