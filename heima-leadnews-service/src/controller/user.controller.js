const fs = require('fs');
const connection = require('../app/database');
const UserDao = require("../dao/user.dao");
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
  async saveUser(ctx, next) {

    const user = ctx.request.body;
    const res = await UserDao.saveUser(user);
    console.log(res);
    ctx.body = {
      code: 200,
      message: '注册成功!',
      data: res
    }
  }
}

module.exports = new UserController();