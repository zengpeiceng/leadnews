const ChannelService = require('../service/channel.services');
class ChannelController {
  async getChannel(ctx, next) {
    const result = await ChannelService.getChannel();

    ctx.body = {
      code: 200,
      message: '获取成功',
      data: result
    }
  }
}

module.exports = new ChannelController()