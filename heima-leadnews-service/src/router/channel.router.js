const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");
const { getChannel } = require("../controller/channel.controller")

const channelRouter = new Router({ prefix: "/channel" });

channelRouter.get("/", verifyAuth, getChannel);
module.exports = channelRouter;
