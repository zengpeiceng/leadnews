const errorTypes = require("../constants/error-types");
const connection = require("../app/database");
const md5password = require("../utils/password-handle");
const UserDao = require("../dao/user.dao");
// const { getUserByName } = require("../service/user.services");

const verifyUser = async (ctx, next) => {
  // 获取用户名密码
  const { name, password } = ctx.request.body;
  // 用户名或密码是否为空
  if (!name || !password || name === "" || password === "") {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  // 用户是否已存在
  const result = await UserDao.getUserByName(name);
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body;
  // 对密码进行加密
  ctx.request.body.password = md5password(password);

  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
