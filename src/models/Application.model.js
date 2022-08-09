const mongoose = require("mongoose");

var applicationDetailsSchema = new mongoose.Schema(
	{
		application_name: {
			type: String,
			trim: true,
			required: false,
		},
		contact_number: {
			type: String,
			trim: true,
			required: false,
		},
		linkedin: {
			type: String,
			trim: true,
			required: false,
		},
		email: {
			type: String,
			trim: true,
			required: false,
		},
	},
	{
		timestamps: true,
	},
);

mongoose.model("ApplicationDetails", applicationDetailsSchema);
