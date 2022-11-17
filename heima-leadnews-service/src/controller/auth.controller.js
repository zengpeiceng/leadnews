const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, PUBLIC_KEY } = require("../app/config");

class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: "RS256",
    });
    ctx.user.password = ""
    ctx.body = {
      host: null,
      code: 200,
      message: "登录成功",
      data: { ...ctx.user, token }
    };
  }

  async success(ctx, next) {
    ctx.body = '授权成功~';
  }
}

module.exports = new AuthController();
