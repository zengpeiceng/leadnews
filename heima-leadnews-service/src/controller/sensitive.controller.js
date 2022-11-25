const SensitiveDao = require("../dao/sensitive.dao");
const { success } = require("../app/response");
class SensitiveController {
  async getSensitives(ctx, next) {
    const { list, total } = await SensitiveDao.getSensitives(ctx.request.body);
    success(ctx, list, "SUCCESS", 200, null, total);
  }
  async reNameSensitive(ctx, next) {
    const {id, name} = ctx.request.body;
    const res = await SensitiveDao.reNameSensitive(id, name);
    success(ctx, "SUCCESS", "操作成功", 200, null);
  }

  async addSensitive(ctx, next) {
    const res = await SensitiveDao.addSensitive(ctx.request.body);
    success(ctx, "SUCCESS", "添加成功", 200, null);
  }

  async delSensitive(ctx, next) {
    const id = ctx.request.params.id;
    const res = await SensitiveDao.delSensitive(id);
    success(ctx, "SUCCESS", "删除成功", 200, null);
  }
}

module.exports = new SensitiveController();
