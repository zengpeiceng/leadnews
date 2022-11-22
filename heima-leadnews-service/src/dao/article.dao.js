const Sequelize = require("sequelize");

const Article = require("../model/article.model");
const ArticleCover = require("../model/article_cover.model");

const Op = Sequelize.Op;

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

    const { keyword, endPubdate, beginPubdate } = data;
    // 关键字查询（title)
    if (keyword) {
      statement.title = { [Op.like]: `%${keyword}%` };
      delete statement.keyword;
    }
    if (beginPubdate && beginPubdate) {
      delete statement.beginPubdate;
      delete statement.endPubdate;
      // 发布时间区间
      statement.publishTime = {
        [Op.gte]: beginPubdate, // <=
        [Op.lte]: endPubdate, // >=
      };
    }

    const res = await Article.findAll({
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
          // 要显示的子表中的数据
          attributes: ["url"],
        },
      ],
    });
    return res;
  }
}

module.exports = new ArticleDao();
