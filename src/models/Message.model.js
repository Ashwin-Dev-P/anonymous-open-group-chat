const mongoose = require("mongoose");

var messageSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		message: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

mongoose.model("Message", messageSchema);
