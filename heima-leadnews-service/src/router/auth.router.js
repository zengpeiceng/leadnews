const Router = require("koa-router");

const { verifyLogin } = require("../middleware/auth.middleware");
const { login } = require("../controller/auth.controller");
const authRouter = new Router({ prefix: "/" });

authRouter.post("wemedia/login", verifyLogin, login);

module.exports = authRouter;
