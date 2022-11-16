const mysql = require("mysql2/promise");

const config = require("./config");

const connection = mysql.createPool({
  host: config.MYQL_HOST,
  port: config.MYSQL_PORT,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
});

// 测试数据库是否连接成功
connection.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log("数据库连接失败", err);
    } else {
      console.log("数据库连接成功");
    }
  });
});

// connection.query(sql, (err, results, fields) => {
//   console.log(results);
//   console.log(fields);
// })

// function query(sql, callback) {
//   connection.getConnection(function (err, conn) {
//     conn.query(sql, function (err, results, fields) {
//       callback(err, results, fields);
//       connection.release(); // 中断连接
//     });
//   });
// }
module.exports = connection;
