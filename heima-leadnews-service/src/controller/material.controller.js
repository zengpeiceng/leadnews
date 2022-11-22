const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const MaterialDao = require("../dao/material.dao");
const { APP_HOST, APP_PORT } = require("../app/config");
const { MATERIAL_PATH } = require("../constants/file-path");
const { success } = require("../app/response");
class MaterialController {
  // 上传素材
  async saveMaterial(ctx, next) {
    const { filename } = ctx.file;
    const userId = ctx.user.id;
    // 数据库中插入素材，返回插入对象的id
    const id = await MaterialDao.saveMaterial(userId, filename);
    // 根据插入的id返回素材信息
    const data = await MaterialDao.querySingleMaterial(id)
    // 处理图片地址
    data.dataValues.url = `http://${APP_HOST}:${APP_PORT}/material/${data.dataValues.url}`
    success(ctx, data.dataValues, "上传成功！", 200, null);
  }
  // 获取素材
  async getMaterials(ctx, next) {
    const { isCollection, page, size } = ctx.request.body;
    // 分页查询素材
    const result = await MaterialDao.getMaterials(isCollection, page, size)
    // 更改url链接
    for (const iterator of result) {
      iterator.url = `http://${APP_HOST}:${APP_PORT}/material/${iterator.url}`;
    }
    // 记录条数
    const total = await MaterialDao.getMaterialLength(isCollection)
    // 返回信息
    success(ctx, result, "SUCCESS", 200, null, total)
  }

  // 收藏素材
  async collectMaterial(ctx, next) {
    const { id } = ctx.request.params;
    const result = await MaterialDao.collectMaterial(id);
    success(ctx, "SUCCESS", "收藏成功", 200, null);
  }

  // 取消收藏 
  async cancelCollect(ctx, next) {
    const { id } = ctx.request.params;
    const result = await MaterialDao.cancelCollect(id)
    success(ctx, "SUCCESS", "已取消收藏", 200, null);
  }

  // 删除素材
  async deleteMaterial(ctx, next) {
    const { id } = ctx.request.params;
    const result = await MaterialDao.removeMaterial(id);
    success(ctx, "SUCCESS", "删除成功", 200, null);
  }


  async getMaterialImage(ctx, next) {
    const { filename } = ctx.params;
    ctx.set("content-type", "image/jpeg");
    ctx.body = fs.createReadStream(`${MATERIAL_PATH}/${filename}`);
  }
}

module.exports = new MaterialController();
