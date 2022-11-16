const connection = require("../app/database");
const handlePassword = require('../utils/password-handle');
class AuthService {
  async checkUser(name, password) {
    const statement = `SELECT * FROM user WHERE name = ? and password = ?;`
    
    const result = await connection.execute(statement, [name, password]);

    return result[0];
  }
}

module.exports = new AuthService();
