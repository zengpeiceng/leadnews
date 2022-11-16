const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const errorHandle = require('./error-handle');
const useRoutes = require('../router');

const app = new Koa();

app.useRoutes = useRoutes;

// 解析json数据格式的数据
app.use(bodyParser());

app.useRoutes();
// 如果 req/res 期间出现错误，并且 无法 响应客户端，Context实例仍然被传递：
app.on('error', errorHandle)
module.exports = app