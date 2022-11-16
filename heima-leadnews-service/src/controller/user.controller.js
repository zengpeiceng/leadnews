const fs = require('fs');
const connection = require('../app/database');

const userService = require('../service/user.services');

class UserController {
  async create(ctx, next) {
    // 获取用户请求参数
    const user = ctx.request.body
    // 操作数据库
    const result = await userService.create(user);
    // 返回数据
    ctx.body = {
      code: 200,
      message: '注册成功!'
    };
  }
}

module.exports = new UserController();