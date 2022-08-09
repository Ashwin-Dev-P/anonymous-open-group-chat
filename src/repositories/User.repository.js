//Modules
const mongoose = require("mongoose");

//Models
const UserModel = mongoose.model("User");

//create user on login
const createUserRepository = async (user_obj) => {
	var user = new UserModel(user_obj);
	const user_result = await user.save();
	return user_result._id;
};

module.exports = {
	createUserRepository,
};
