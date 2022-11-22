const Sequelize = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize(
  config.MYSQL_DATABASE,
  config.MYSQL_USER,
  config.MYSQL_PASSWORD,
  {
    host: config.MYQL_HOST,
    port: config.MYSQL_PORT,
    dialect: "mysql",
    define: {
      //停止 Sequelize 执行自动复数化. 这样,Sequelize 将推断表名称等于模型名称,而无需进行任何修改
      freezeTableName: true,
    }
  }
);

// 测试数据库是否连接成功
sequelize
  .authenticate()
  .then(() => {
    console.log("连接数据库成功~");
  })
  .catch((err) => {
    console.log("连接数据库失败~", err);
  });

module.exports = sequelize;
