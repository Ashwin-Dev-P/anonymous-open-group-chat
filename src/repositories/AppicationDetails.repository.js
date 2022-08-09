//Modules
const mongoose = require("mongoose");

//Models
const ApplicationDetailsModel = mongoose.model("ApplicationDetails");

const getAppDetailsRepository = async () => {
	return await ApplicationDetailsModel.findOne()
		.select("-_id linkedin contact_number email application_name")
		.lean();
};

module.exports = {
	getAppDetailsRepository,
};
