const ChannelService = require('../service/channel.services');
class ChannelController {
  async getChannel(ctx, next) {
    console.log('getChannel');
    const result = await ChannelService.getChannel();
    console.log(result);
    ctx.body = {
      code: 200,
      message: '获取成功',
      data: result
    }
  }
}

module.exports = new ChannelController()