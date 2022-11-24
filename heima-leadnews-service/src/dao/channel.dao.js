const { Op } = require("sequelize");
const Channel = require("../model/channel.model");

class ChannelDao {
  async getChannel() {
    const res = Channel.findAll();
    return res;
  }
  async adminGetChannel(data) {
    const { page, size, name, status } = data;
    const statement = {};
    if(name) {
      statement.name = {
        [Op.like] : `%${name}%`
      }
    }
    if(status !== undefined && statement !== null) {
      statement.status = status
    }
    const { rows, count } = await Channel.findAndCountAll({
      where: statement,
      offset: (page - 1) * size,
      limit: size,
    });
    return { data: rows, total: count };
  }
}

module.exports = new ChannelDao();
