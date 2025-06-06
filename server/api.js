const express = require("express");
const apiRouter = express.Router();

const minionsRouter = require("./routes/minionsRoutes");
const ideasRouter = require("./routes/ideasRoutes");
const meetingsRouter = require("./routes/meetingsRoutes");

apiRouter.use("/minions", minionsRouter);
apiRouter.use("/ideas", ideasRouter);
apiRouter.use("/meetings", meetingsRouter);

module.exports = apiRouter;
