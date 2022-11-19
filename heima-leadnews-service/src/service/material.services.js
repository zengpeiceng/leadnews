const connection = require("../app/database");

class FileService {
  // 新建素材
  async createMaterial(userId, url) {
    const statement = `INSERT INTO material (userId, url) VALUES (?,?);`;
    const result = await connection.execute(statement, [userId, url]);

    return result[0];
  }
  // 获取素材
  async getMaterials(isCollection, page, size) {
    let statement, result;
    if(isCollection === 1 || isCollection === true) {
      statement = `SELECT * FROM material WHERE isCollection = ? limit ?, ?;`
      result = await connection.execute(statement, [isCollection, (page - 1) * size + '', size + '']);
    }else {
      statement = `SELECT * FROM material limit ?,?;`;
      result = await connection.execute(statement, [(page - 1) * size + '', size + '']);
    }
    return result[0];
  }
  // total
  async getMaterialLength(isCollection) {
    let statement, result;
    
    if(isCollection === 1 || isCollection === true) {
      statement = `SELECT * FROM material WHERE isCollection = ?;`;
      result = await connection.execute(statement, [isCollection])
    }else {
      statement = `SELECT * FROM material`;
      result = await connection.execute(statement)
    }
    return result[0];
  }
  // 收藏素材
  async collectMaterial(id) {
    const statement = `UPDATE material SET isCollection = 1 where id = ?;`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }
  // 取消收藏素材
  async cancelCollect(id) {
    const statement = `UPDATE material SET isCollection = 0 where id = ?;`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }
  // 删除素材
  async removeMaterial(id) {
    const statement = `DELETE FROM material WHERE id = ?;`;
    const result = await connection.execute(statement, [id]);
    return result[0];
  }
  // 验证是否有权限
  async verifyPermission(uid, mid) {
    const statement = `SELECT * FROM material WHERE userId = ? and id = ?`;
    const result = await connection.execute(statement, [uid, mid]);
    return result[0];
  }
}

module.exports = new FileService();
