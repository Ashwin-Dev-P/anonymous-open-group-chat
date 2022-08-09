const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

//repositories
const messageRepositories = require("../repositories/Message.repository");

const saveMessageService = async (clientJwt, message) => {
	try {
		const decoded = await jwt.verify(clientJwt, JWT_SECRET);
		const user_id = decoded._id;
		await messageRepositories.saveMessageRepository(user_id, message);
	} catch (error) {
		console.error("Try catch error caught");
		console.error(error);
	}
};

const getMessagesService = async (limit) => {
	try {
		const select = "message createdAt";
		const user_populate_select = "username";

		const messages = await messageRepositories.getMessagesRepository(
			limit,
			select,
			user_populate_select,
		);

		const result = {
			messages: messages,
			status: 200,
		};

		return result;
	} catch (error) {
		console.error("Try catch error caught");
		console.error(error);
		const result = {
			message: error.message || "Something went wrong",
			status: error.status || 500,
		};

		return result;
	}
};

module.exports = {
	saveMessageService,
	getMessagesService,
};
