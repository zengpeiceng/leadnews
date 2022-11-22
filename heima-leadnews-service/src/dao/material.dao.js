const Material = require("../model/material.model");

class MaterialDao {
  // 上传素材
  async saveMaterial(userId, url) {
    console.log(url);
    const res = await Material.create({
      userId,
      url,
    });
    return res.dataValues.id;
  }
  // 查询单个素材Byid
  async querySingleMaterial(id) {
    const res = await Material.findByPk(id);
    return res;
  }
  // 查询素材
  async getMaterials(isCollection, page, size) {
    let statement;
    if (isCollection == 1) {
      statement =
        { where: { isCollection }, limit: size, offset: (page - 1) * size };
    } else {
      statement = { limit: size, offset: (page - 1) * size };
    }
    const res = await Material.findAll(statement);
    return res;
  }
  // total
  async getMaterialLength(isCollection) {
    let statement;
    if(isCollection == 1) {
      statement = {where: {isCollection}}
    }else {
      statement = null
    }
    const res = await Material.count(statement)
    return res;
  }
  // 收藏素材
  async collectMaterial(id) {
    const res = Material.update({
      isCollection: 1
    }, {
      where: {
        id
      }
    })
  }
  // 取消收藏 
  async cancelCollect(id) {
    const res = Material.update({
      isCollection: 0
    }, {
      where: {
        id
      }
    })
  }
  // 验证删除素材权限
  async verifyPermission(uid, mid) {
    const res = await Material.findAll({
      where: {
        id: mid.id,
        userId: uid
      }
    })
    return res;
  }
  // 删除素材
  async removeMaterial(id) {
    const res = await Material.destroy({
      where: {
        id
      }
    })
    return res;
  }
}

module.exports = new MaterialDao();
