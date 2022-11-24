const { Op } = require("sequelize");
const Channel = require("../model/channel.model");

class ChannelDao {
  // 全部
  async getChannel() {
    const res = Channel.findAll();
    return res;
  }
  // 搜索：分页，total
  async adminGetChannel(data) {
    const { page, size, name, status } = data;
    const statement = {};
    if (name) {
      statement.name = {
        [Op.like]: `%${name}%`,
      };
    }
    if (status !== undefined && statement !== null) {
      statement.status = status;
    }
    const { rows, count } = await Channel.findAndCountAll({
      where: statement,
      offset: (page - 1) * size,
      limit: size,
    });
    return { data: rows, total: count };
  }
  // update
  async adminUpdateChannel(data) {
    const { id } = data;
    delete data.id;
    const res = await Channel.update(data,
      {
        where: {
          id,
        },
      }
    );
  }
  // del
  async adminDelChannel(id) {
    const res = await Channel.destroy({
      where: {
        id
      }
    })
    return res;
  }
  // create
  async adminSaveChannel(data) {
    const res = await Channel.create(data)
    return res;
  }
}

module.exports = new ChannelDao();
