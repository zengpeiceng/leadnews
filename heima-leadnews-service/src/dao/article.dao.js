const { Article, ArticleCover, User} = require("../model/index");

const { Op } = require("sequelize");

class ArticleDao {
  // 发布文章
  async saveArticle(data) {
    const res = await Article.create({
      ...data,
    });
    return res.dataValues.id;
  }
  async getArticlById(id) {
    const res = await Article.findAll({
      where: {
        id,
      },
      include: [
        {
          model: ArticleCover,
          as: "images",
          raw: true,
          required: false, // 左外连接
          attributes: ["url"],
        },
      ],
      distinct: true,
    });
    return res;
  }
  // 获取文章
  async getArticles(data) {
    const offset = (data.page - 1) * data.size,
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
          attributes: ["url"],
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
        userId,
      },
    });
    return res;
  }
  // 删除文章
  async delArticle(id) {
    const res = await Article.destroy({
      where: {
        id,
      },
    });
    return res;
  }
  async updateArticle(data) {
    const { id, userId } = data;
    delete data.id, data.userId;

    const res = await Article.update(data, {
      where: {
        id,
        userId,
      },
    });
    return res;
  }
  // 上架/下架
  async changeArticleEnable(id, enable) {
    const res = await Article.update(
      {
        enable,
      },
      {
        where: {
          id,
        },
      }
    );
    return res;
  }
  async showArticleRelativeMsg(data) {
    const { page, size, title, status, enable, beginPubDate, endPubDate } = data;
    delete data.userId, page, size;
    let statement = {};
    if(!status) {
      statement.status = {
        [Op.ne]: "0",
      }
    }
    if (title) {
      statement.title = {
        [Op.like]: `%${title}%`,
      };
    }
    if (status) {
      statement.status = status;
    }
    if(enable != undefined && enable != null) {
      statement.enable = {
        [Op.eq]: enable
      }
    }
    if(beginPubDate && endPubDate) {
      statement.createdTime = {
        [Op.gte]: beginPubDate,
        [Op.lte]: endPubDate
      }
    }
    const { rows, count } = await Article.findAndCountAll({
      where: statement,
      distinct: true,
      include: [
        {
          model: User,
          as: "author",
          attributes: ["name"],
          required: false
        },
        {
          model: ArticleCover,
          as: "images",
          attributes: ["url"],
          required: false,
        },
      ],
      offset: (page - 1) * size,
      limit: size
    });
    return { data: rows, total: count };
  }
  async showArticleDetail(id) {
    const res = await Article.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ArticleCover,
          as: "images",
          raw: true,
          required: false, // 左外连接
          attributes: ["url"],
        },
        {
          model: User,
          as: "author",
          required: false,
          attributes: ["name"]
        }
      ],
      distinct: true,
    });
    return res.dataValues;
  }
  async toExamine(id, status) {
    const res = await Article.update({status}, {
      where: {
        id
      }
    })
    return res;
  }
}

module.exports = new ArticleDao();
