const express = require("express");
const router = express.Router();

//controllers
const applicationDetailsControllers = require("../../controllers/ApplicationDetails.controller");

router.get("/", applicationDetailsControllers.getAppDetailsController);

module.exports = router;
