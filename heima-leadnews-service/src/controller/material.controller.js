const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const fileService = require("../service/material.services.js");
const { APP_HOST, APP_PORT } = require("../app/config");
const { MATERIAL_PATH } = require("../constants/file-path");
class MaterialController {
  async saveMaterial(ctx, next) {
    const { filename } = ctx.file;
    const userId = ctx.user.id;
    const result = await fileService.createMaterial(userId, filename);
    ctx.body = {
      host: null,
      code: 200,
      message: "上传成功！",
    };
  }
  // 获取素材
  async getMaterials(ctx, next) {
    const { isCollection, page, size } = ctx.request.body;
    const result = await fileService.getMaterials(isCollection, page, size);
    for (const iterator of result) {
      iterator.url = `http://${APP_HOST}:${APP_PORT}/material/${iterator.url}`;
    }
    const total = await fileService.getMaterialLength(isCollection, page, size);
    ctx.body = {host: null, code: 200, data: result, total: total.length};
  }

  // 收藏素材
  async collectMaterial(ctx, next) {
    const { id } = ctx.request.params;
    const result = await fileService.collectMaterial(id);
    ctx.body = {
      host: null,
      code: 200,
      message: "收藏成功",
      data: "SUCCESS"
    }
  }

  // 取消收藏 
  async cancelCollect(ctx, next) {
    const { id } = ctx.request.params;
    const result = await fileService.cancelCollect(id);
    ctx.body = {
      host: null,
      code: 200,
      message: "操作成功",
      data: "SUCCESS"
    }
  }

  // 删除素材
  async deleteMaterial(ctx, next) {
    const { id } = ctx.request.params;
    const result = await fileService.removeMaterial(id);
    ctx.body = {
      host: null,
      code: 200,
      message: "删除成功",
      data: "SUCCESS"
    }
  }

  async getMaterialImage(ctx, next) {
    const { filename } = ctx.params;
    ctx.set("content-type", "image/jpeg");
    ctx.body = fs.createReadStream(`${MATERIAL_PATH}/${filename}`);
  }
}

module.exports = new MaterialController();
