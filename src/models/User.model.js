const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
		},
		ipAddress: {
			type: String,
		},
		userAgent: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

mongoose.model("User", userSchema);
