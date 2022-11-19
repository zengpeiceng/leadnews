const Router = require("koa-router");

const articleRouter = new Router({prefix: "/"});
const { verifyAuth } = require("../middleware/auth.middleware");
const { submitArticle } = require("../controller/article.controller");

// 发表文章
articleRouter.post("wemedia/article/submit", verifyAuth, submitArticle);
// 获取内容列表


module.exports = articleRouter;