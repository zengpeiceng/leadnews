const Router = require("koa-router");

const { saveUser } = require("../controller/user.controller");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");
const userRouter = new Router({ prefix: "/register" });

userRouter.post("/", verifyUser, handlePassword, saveUser)

module.exports = userRouter;
