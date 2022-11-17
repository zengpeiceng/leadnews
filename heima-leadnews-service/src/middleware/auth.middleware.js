const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config");
const errorTypes = require("../constants/error-types");
const AuthService = require("../service/auth.services");
const md5Password = require("../utils/password-handle");

// 登录验证接口
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  console.log(name,password);
  // 用户名或密码是否为空
  if (!name || !password || name === "" || password === "") {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return new Error("error", error, ctx);
  }

  const result = await AuthService.checkUser(name, md5Password(password));

  if (!result.length) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_INCORRECT);
    return ctx.app.emit("error", error, ctx);
  }
  ctx.user = result[0];
  next();
};

// 验证是否登录
const verifyAuth = async (ctx, next) => {
  // 1.获取token
  const authorization = ctx.header.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");

  // 2.验证token(id/name/iat/exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    });
    ctx.user = result;
    await next();
  } catch (err) {
    console.log(err);
    const error = new Error(errorTypes.LOGIN_TIMEOUT);
    return ctx.app.emit('error', error, ctx);
  }
};

module.exports = {
  verifyLogin,
  verifyAuth
};
