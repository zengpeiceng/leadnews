const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, PUBLIC_KEY } = require("../app/config");
const { success } = require("../app/response");

class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });
    ctx.user.password = "";
    delete ctx.user.password;
    success(ctx, {...ctx.user, token}, "登录成功", 200);
  }

  async success(ctx, next) {
    ctx.body = "授权成功~";
  }
}

module.exports = new AuthController();
