const { Sensitive } = require("../model");
const { Op } = require("sequelize");
class SensitiveDao {
  async getSensitives(data) {
    const { page, size, name } = data;
    let statement = {};
    if (name) {
      statement.name = {
        [Op.like]: `%${name}%`,
      };
      console.log(statement);
    }
    const { rows, count } = await Sensitive.findAndCountAll({
      where: statement,
      limit: size,
      offset: (page - 1) * size,
    });
    return { list: rows, total: count };
  }
  async reNameSensitive(id, name) {
    const res = await Sensitive.update(
      { name },
      {
        where: {
          id,
        },
      }
    );
    return res;
  }
  async addSensitive(data) {
    await Sensitive.create(data);
  }
  async delSensitive(id) {
    await Sensitive.destroy({
      where: {
        id
      }
    })
  }
}

module.exports = new SensitiveDao();
