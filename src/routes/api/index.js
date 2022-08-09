const express = require("express");
const router = express.Router();

//import routes
const messageRoutes = require("./message.routes");
const applicationDetailsRoutes = require("./appDetails.routes");

//routes
router.use("/message", messageRoutes);
router.use("/application_details", applicationDetailsRoutes);

module.exports = router;
