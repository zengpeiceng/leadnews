const Article = require("../model/article.model");
const ArticleCover = require("../model/article_cover.model");

const { Op } = require("sequelize");

class ArticleDao {
  // 发布文章
  async saveArticle(data) {
    const res = await Article.create({
      ...data,
    });
    return res.dataValues.id;
  }
  // 获取文章
  async getArticles(data) {
    const offset = data.page - 1,
      limit = data.size;

    const statement = { ...data };
    delete statement.page;
    delete statement.size;

    const { keyword, endPubDate, beginPubDate } = data;
    // 关键字查询（title)
    if (keyword != "" && keyword != undefined && keyword != null && keyword) {
      statement.title = { [Op.like]: `%${keyword}%` };
      delete statement.keyword;
    }
    if (beginPubDate && beginPubDate) {
      delete statement.beginPubDate;
      delete statement.endPubDate;
      // 发布时间区间
      statement.publishTime = {
        [Op.gte]: beginPubDate, // <=
        [Op.lte]: endPubDate, // >=
      };
    }
    const { rows, count } = await Article.findAndCountAll({
      where: statement,
      offset,
      limit,
      // 子查询
      include: [
        {
          model: ArticleCover,
          as: "images", // 查询字段别名
          required: true, // 采用内连接
          raw: true,
          required: false, // 左外连接
          // 要显示的子表中的数据
        },
      ],
      distinct: true,
    });
    return { list: rows, total: count };
  }
  // 验证权限
  async verifyPermission(userId, id) {
    const res = await Article.count({
      where: {
        id,
        userId
      }
    })
    return res;
  }
  // 删除文章
  async delArticle(id) {
    const res = await Article.destroy({
      where: {
        id
      }
    })
    return res;
  }
}

module.exports = new ArticleDao();
