const Router = require("koa-router");
const sensitiveRouter = new Router({ prefix: "/weadmin/sensitive" });

const { verifyAuth } = require("../middleware/auth.middleware");
const { getSensitives, reNameSensitive, addSensitive, delSensitive } = require("../controller/sensitive.controller");
sensitiveRouter.post("/list", verifyAuth, getSensitives);
sensitiveRouter.post("/update", verifyAuth, reNameSensitive);
sensitiveRouter.post("/add", verifyAuth, addSensitive);
sensitiveRouter.delete("/delete/:id", verifyAuth, delSensitive);

module.exports = sensitiveRouter;
