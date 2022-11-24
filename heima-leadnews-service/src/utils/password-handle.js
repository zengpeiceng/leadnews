// 标准和安全加密算法的JavaScript实现
const crypto = require('crypto');

const md5password = (password) => {
  // md5对象
  const md5 = crypto.createHash('md5');
  // hex：返回十六进制的加密密码，默认是二进制
  const result = md5.update(password).digest('hex');
  return result;
}

module.exports = md5password