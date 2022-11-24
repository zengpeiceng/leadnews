const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");
const { getChannel, adminGetChannel, adminUpdateChannel, adminDelChannel, adminSaveChannel } = require("../controller/channel.controller")

const channelRouter = new Router({ prefix: "/" });

channelRouter.get("wemedia/channel", verifyAuth, getChannel);

channelRouter.post("weadmin/channel/list", verifyAuth, adminGetChannel);
channelRouter.put("weadmin/channel_update", verifyAuth, adminUpdateChannel);
channelRouter.delete("weadmin/channel/deleteById/:id", verifyAuth, adminDelChannel);
channelRouter.post("weadmin/channel/create", verifyAuth, adminSaveChannel);
module.exports = channelRouter;
