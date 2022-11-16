const dotenv = require('dotenv')
const fs = require('fs');
const path = require('path');

dotenv.config();

// / fs.readFileSync(path[, options]) // 读取文件，返回值类型是String|Buffer
// path.resolve([...paths]多个地址，或地址片段) 
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));
// __dirname 当前文件的绝对路径    
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'));
module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USer,
  MYSQL_PASSWORD,
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY