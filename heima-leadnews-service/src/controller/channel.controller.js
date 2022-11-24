const ChannelDao = require("../dao/channel.dao");
const {success} = require("../app/response");
class ChannelController {
  async getChannel(ctx, next) {
    const result = await ChannelDao.getChannel();
    success(ctx, result, "SUCCESS", 200, null);
  }
  async adminGetChannel(ctx, next) {
    const result = await ChannelDao.adminGetChannel(ctx.request.body);
    success(ctx, result.data, "SUCCESS", 200, null);
  }
}

module.exports = new ChannelController()