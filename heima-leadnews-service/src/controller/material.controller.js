const fs = require("fs");
const path = require("path");
const mime = require("mime-types")
const fileService = require("../service/material.services.js");
const { APP_HOST, APP_PORT } = require("../app/config");
const { MATERIAL_PATH } = require("../constants/file-path");
class MaterialController {
  async saveMaterial(ctx, next) {
    console.log("saveMaterial");
    const { filename } = ctx.file;
    const userId = ctx.user.id;
    const result = await fileService.createMaterial(userId, filename);
    ctx.body = {
      host: null,
      code: 200,
      message: "上传成功！",
    };
  }

  async getMaterials(ctx, next) {
    const { isCollection, page, size } = ctx.request.body;
    const result = await fileService.getMaterials(isCollection, page, size);
    for (const iterator of result) {
      iterator.url = `http://${APP_HOST}:${APP_PORT}/material/${iterator.url}`;
    }
    ctx.body = result;
  }

  async getMaterialImage(ctx, next) {
    const { filename } = ctx.params;
    ctx.set('content-type', 'image/jpeg'); 
    ctx.body = fs.createReadStream(`${MATERIAL_PATH}/${filename}`);
  }
}

module.exports = new MaterialController();
