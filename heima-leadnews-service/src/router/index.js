const fs = require('fs');

const useRoutes = function() {
  fs.readdirSync(__dirname).forEach(file => {
    if(file === 'index.js') return;
    const router = require(`./${file}`);
    // 这里的this 是app 隐式绑定 app.useRoutes = useRoutes
    this.use(router.routes())
    // 请求方法错误提示
    this.use(router.allowedMethods())
  })
}

module.exports = useRoutes;