const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const fileService = require("../service/material.services.js");
const { APP_HOST, APP_PORT } = require("../app/config");
const { MATERIAL_PATH } = require("../constants/file-path");
class MaterialController {
  // 上传素材
  async saveMaterial(ctx, next) {
    const { filename } = ctx.file;
    const userId = ctx.user.id;
    // 数据库中插入素材，返回插入对象包括插入的id
    const result = await fileService.createMaterial(userId, filename);
    // 根据插入的id返回素材信息
    const data = await fileService.querySingleMaterial(result.insertId)
    // 处理图片地址
    data[0].url = `http://${APP_HOST}:${APP_PORT}/material/${data[0].url}`
    ctx.body = {
      host: null,
      code: 200,
      data: data[0],
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
