const Jimp = require("jimp");
const path = require("path");
const Multer = require("@koa/multer");

const { MATERIAL_PATH } = require("../constants/file-path");

const materialUpload = Multer({
  dest: MATERIAL_PATH,
});
const materialHandler = materialUpload.single("material");
module.exports = {
  materialHandler
}