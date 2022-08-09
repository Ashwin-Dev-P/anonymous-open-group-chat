//services
const applicationDetailsService = require("../services/ApplicationDetails.service");

//controllers
const getAppDetailsController = async (req, res) => {
	res.setHeader("Content-Type", "application/json");
	const result = await applicationDetailsService.getAppDetailsService();

	return res.status(result.status).json(result);
};

module.exports = {
	getAppDetailsController,
};
