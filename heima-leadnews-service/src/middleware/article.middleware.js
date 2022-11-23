const errorTypes = require("../constants/error-types");
const articleDao = require("../dao/article.dao");

const verifyPermission = async (ctx, next) => {
  const uid = ctx.user.id;
  const aid = ctx.request.params.id;
  const count = await articleDao.verifyPermission(uid, aid);
  if (count != 0) {
   await next();
  } else {
    const error = new Error(errorTypes.UNPERMISSION);
   return  ctx.app.emit("error", error, ctx);
  }
};
module.exports = {
  verifyPermission
}