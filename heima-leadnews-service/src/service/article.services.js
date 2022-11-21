const connection = require("../app/database");
const dateFormat = require("../app/dateFormat.js");
class ArticleService {
  // 发布文章
  async saveArticle(data) {
    const {
      title,
      type,
      labels,
      channelId,
      content,
      images,
      status,
      publishTime,
    } = data;
    // 格式化时间
    let date = dateFormat(publishTime);
    const statement1 = `INSERT INTO article(title, type, labels, channelId, content, status, publishTime) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    // 获取文章id
    let result = await connection.execute(statement1, [
      title,
      type,
      labels,
      channelId,
      content,
      status,
      date,
    ]);

    const articleId = result[0].insertId;
    const statement2 = `INSERT INTO article_cover(url, articleId)  VALUES(?, ?) `;
    for (const image of images) {
      result = await connection.execute(statement2, [image, articleId]);
    }
    return result[0];
  }
  // 获取文章
  async getMaterial(data) {
    const { page, size, status, keyword, channelId, beginPubdate, endPubdate } =
      data;
    
    let statement;
    if (status && keyword && channelId && beginPubdate && endPubdate) {
      statement = `SELECT article.id articleId, content, channelId, labels, status, title, type, publishTime, userId, enable, createTime, submitedTime, JSON_OBJECT("id", article_cover.id, "url", url) images
      FROM article 
        JOIN article_cover 
        on article.id = article_cover.articleId WHERE channelId = ? AND status = ? LIMIT ?, ?;`;
    }
    const result = await connection.execute(statement);
    return result[0];
  }
}

module.exports = new ArticleService();
