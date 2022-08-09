const mongoose = require("mongoose");

var visitorSchema = new mongoose.Schema(
	{
		ipAddress: {
			type: String,
		},
		userAgent: {
			type: String,
		},
		visits: [
			{
				type: Date,
				default: Date.now,
			},
		],
	},
	{
		timestamps: true,
	},
);

mongoose.model("Visitor", visitorSchema);
