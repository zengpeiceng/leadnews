const { User } = require("../model/index");

class UserDao {
  // 注册用户
  async saveUser(user) {
    const res = await User.create(user);
    delete res.dataValues.password;
    return res.dataValues;
  }
  // 登录查询
  async queryUser(user) {
    const res = await User.findAll({
      where: {
        ...user,
      },
    });

    return res;
  }
  async getUserByName(name) {
    const res = await User.findAll({
      where: {
        name,
      },
    });
    return res;
  }
}

module.exports = new UserDao();
