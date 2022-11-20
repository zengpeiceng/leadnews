const connection = require("../app/database");
class ArticleService {
  async saveArticle(data) {
    const { title, type, labels, channelId, content, images, status, publishTime } = data;
    const statement1 = `INSERT INTO article(title, type, labels, channelId, content, status, publishTime) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    // 获取文章id
    let result = await connection.execute(statement1, [title, type, labels, channelId, content, status, publishTime]);
    // console.log(result);
    const articleId = result[0].insertId;
    const statement2 = `INSERT INTO article_cover(url, articleId)  VALUES(?, ?) `
    for (const image of images) {
      console.log(image);
      result = await connection.execute(statement2, [image, articleId]);
    }
    return result[0]
  }
}

module.exports = new ArticleService();