const Router = require("koa-router");

const articleRouter = new Router({prefix: "/article"});
const { verifyAuth } = require("../middleware/auth.middleware");
const { submitArticle } = require("../controller/article.controller");

// 发表文章
articleRouter.post("/submit", verifyAuth, submitArticle);
// 获取内容列表


module.exports = articleRouter;