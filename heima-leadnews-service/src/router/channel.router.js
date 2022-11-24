const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");
const { getChannel, adminGetChannel } = require("../controller/channel.controller")

const channelRouter = new Router({ prefix: "/" });

channelRouter.get("wemedia/channel", verifyAuth, getChannel);
channelRouter.post("weadmin/channel/list", verifyAuth, adminGetChannel);
module.exports = channelRouter;
