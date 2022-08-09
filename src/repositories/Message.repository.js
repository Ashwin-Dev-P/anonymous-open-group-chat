//Modules
const mongoose = require("mongoose");

//Models
const MessageModel = mongoose.model("Message");

const saveMessageRepository = async (user_id, message) => {
	var message_obj = new MessageModel();
	message_obj.message = message;
	message_obj.user = user_id;
	await message_obj.save();
};

const getMessagesRepository = async (limit, select, user_populate_select) => {
	return await MessageModel.find()
		.sort({ createdAt: -1 })
		.limit(limit)
		.select(select)
		.populate("user", user_populate_select)
		.lean();
};

module.exports = {
	saveMessageRepository,
	getMessagesRepository,
};
