const Router = require('koa-router');
const materialRouter = new Router({prefix: '/material'});

const { verifyAuth } = require("../middleware/auth.middleware");
const { materialHandler } = require("../middleware/material.middleware");
const { saveMaterial, getMaterials, getMaterialImage } = require("../controller/material.controller");
// 上传
materialRouter.post("/upload_picture", verifyAuth, materialHandler, saveMaterial);
// 获取素材列表
materialRouter.post("/list", verifyAuth, getMaterials)

// 图片地址
materialRouter.get("/:filename", getMaterialImage)

module.exports = materialRouter