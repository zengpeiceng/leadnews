const Channel = require("../model/channel.model");

class ChannelDao {
  async getChannel() {
    const res = Channel.findAll();
    return res;
  }
}

module.exports = new ChannelDao();