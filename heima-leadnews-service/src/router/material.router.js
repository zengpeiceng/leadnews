const Router = require('koa-router');
const materialRouter = new Router({prefix: '/'});

const { verifyAuth } = require("../middleware/auth.middleware");
const { materialHandler, verifyPermission } = require("../middleware/material.middleware");
const { saveMaterial, getMaterials, getMaterialImage, collectMaterial, cancelCollect, deleteMaterial } = require("../controller/material.controller");
// 上传
materialRouter.post("wemedia/material/upload_picture", verifyAuth, materialHandler, saveMaterial);
// 获取素材列表
materialRouter.post("wemedia/material/list", verifyAuth, getMaterials)
// 收藏
materialRouter.get("wemedia/material/collect/:id", verifyAuth, collectMaterial);
// 取消收藏 
materialRouter.get("wemedia/material/cancel_collect/:id", verifyAuth, cancelCollect);
// 删除素材
materialRouter.delete("wemedia/material/delete_material/:id", verifyAuth, verifyPermission, deleteMaterial);
// 图片地址
materialRouter.get("material/:filename", getMaterialImage)

module.exports = materialRouter