const connection = require("../app/database");

class FileService {
  async createMaterial(userId, url) {
    const statement = `INSERT INTO material (userId, url) VALUES (?,?);`;
    const result = await connection.execute(statement, [userId, url]);

    return result[0];
  }

  async getMaterials(isCollection, page, size) {
    let statement, result;
    if(isCollection === 1) {
      statement = `SELECT * FROM material WHERE isCollection = ? limit ?, ?;`
      result = await connection.execute(statement, [isCollection, (page - 1) * size + '', size + '']);
    }else {
      statement = `SELECT * FROM material limit ?,?;`;
      result = await connection.execute(statement, [(page - 1) * size + '', size + '']);
    }
    return result[0];
  }
}

module.exports = new FileService();
