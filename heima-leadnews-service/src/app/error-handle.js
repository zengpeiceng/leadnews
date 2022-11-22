const errorType = require('../constants/error-types');
const { error } = require("../app/response");
const errorHandler = (err, ctx) => {
  let code, message;
  switch(err.message) {
    case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
      code = 400;
      message = '用户名或密码不能为空';
      break;
    case errorType.NAME_OR_PASSWORD_IS_INCORRECT:
      code = 400;
      message = '用户名或密码错误';
      break;
    case errorType.USER_ALREADY_EXISTS:
      code = 409;
      message = '用户已存在';
      break;
    case errorType.UNAUTHORIZATION:
      code = 401;
      message = '您还未登录，请先登录';
      break;
    case errorType.LOGIN_TIMEOUT:
      code = 401;
      message = '无效的token，请重新登录';
      break;
    case errorType.UNPERMISSION:
      code = 401;
      message = '您没有操作的权限';
      break;
    default:
      code = 404;
      message = 'NOT FOUND';
  }
  error(ctx, message, code);
}

module.exports = errorHandler;