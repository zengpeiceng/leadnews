const ChannelDao = require("../dao/channel.dao");
const {success} = require("../app/response");
class ChannelController {
  async getChannel(ctx, next) {
    const result = await ChannelDao.getChannel();
    success(ctx, result, "SUCCESS", 200, null);
  }
  async adminGetChannel(ctx, next) {
    const result = await ChannelDao.adminGetChannel(ctx.request.body);
    const total = result.total;
    success(ctx, result.data, "SUCCESS", 200, null, total);
  }
  async adminUpdateChannel(ctx, next) {
    const reslut = await ChannelDao.adminUpdateChannel(ctx.request.body);
    success(ctx, "SUCCESS", "操作成功", 200, null);
  }
  async adminDelChannel(ctx, next) {
    const result = await ChannelDao.adminDelChannel(ctx.request.params.id);
    success(ctx, "SUCCESS", "操作成功", 200, null);
  }
  async adminSaveChannel(ctx, next) {
    const result = await ChannelDao.adminSaveChannel(ctx.request.body);
    success(ctx, "SUCCESS", "操作成功", 200, null);
  }
}

module.exports = new ChannelController()