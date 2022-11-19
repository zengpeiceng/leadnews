const Jimp = require("jimp");
const path = require("path");
const Multer = require("@koa/multer");

const errorTypes = require("../constants/error-types");
const { MATERIAL_PATH } = require("../constants/file-path");
const fileService = require("../service/material.services");

const materialUpload = Multer({
  dest: MATERIAL_PATH,
});

// 验证权限
const verifyPermission = async (ctx, next) => {
  const uid = ctx.user.id;
  const mid = ctx.request.params;
  const result = await fileService.verifyPermission(uid, mid);
  if (result) {
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
