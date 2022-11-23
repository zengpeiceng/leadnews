const Jimp = require("jimp");
const path = require("path");
const Multer = require("@koa/multer");

const errorTypes = require("../constants/error-types");
const { MATERIAL_PATH } = require("../constants/file-path");
const materialDao = require("../dao/material.dao");

const materialUpload = Multer({
  dest: MATERIAL_PATH,
});

// 验证权限
const verifyPermission = async (ctx, next) => {
  const uid = ctx.user.id;
  const mid = ctx.request.params;
  const result = await materialDao.verifyPermission(uid, mid);

  if (result.length != 0) {
   await next();
  } else {
    const error = new Error(errorTypes.UNPERMISSION);
   return  ctx.app.emit("error", error, ctx);
  }
};
const materialHandler = materialUpload.single("material");
module.exports = {
  materialHandler,
  verifyPermission,
};
