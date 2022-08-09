//controller
const messageServices = require("../services/Message.service");

const getMessagesController = async (req, res) => {
	res.setHeader("Content-Type", "application/json");

	const { limit } = req.params;

	const result = await messageServices.getMessagesService(limit);

	return res.status(result.status).json(result);
};

module.exports = {
	getMessagesController,
};
