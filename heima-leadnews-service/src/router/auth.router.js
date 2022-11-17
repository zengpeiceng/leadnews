const Router = require("koa-router");

const { verifyLogin } = require("../middleware/auth.middleware");
const { login } = require("../controller/auth.controller");
const authRouter = new Router({ prefix: "/wemedia" });

authRouter.post("/login", verifyLogin, login);

module.exports = authRouter;
