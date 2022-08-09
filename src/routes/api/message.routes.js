const express = require("express");
const router = express.Router();

//controllers
const messageControllers = require("../../controllers/Message.controller");

router.get("/limit/:limit", messageControllers.getMessagesController);

module.exports = router;
