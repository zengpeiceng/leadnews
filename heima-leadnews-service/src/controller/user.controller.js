const UserDao = require("../dao/user.dao");
const {success} = require("../app/response");
class UserController {

  async saveUser(ctx, next) {

    const user = ctx.request.body;

    const res = await UserDao.saveUser(user);

    success(ctx, res, "注册成功", 200, null)
  }
}

module.exports = new UserController();