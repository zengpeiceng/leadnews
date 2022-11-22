const fs = require("fs");
const connection = require("../app/database");

class UserService {
  async create(user) {
    const { name, password } = user;
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;

    const results = await connection.execute(statement, [name, password]);

    return results[0];
  }
  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`;

    const results = await connection.execute(statement, [name]);

    return results[0];
  }
}

module.exports = new UserService();
