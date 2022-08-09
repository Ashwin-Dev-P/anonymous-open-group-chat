//To enable .env file
require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });

const mongoose = require("mongoose");

//Constants
const USE_MONGODB_ATLAS = process.env.USE_MONGODB_ATLAS;
const DB_NAME = process.env.DB_NAME;
const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_URI;

var uri;
if (USE_MONGODB_ATLAS === "true" || process.env.NODE_ENV === "production") {
	//Uses mongodb atlas cloud service
	console.info("Using cloud mongodb Atlas storage");
	uri = MONGODB_ATLAS_URI;
} else {
	//Uses mongodb compass localhost storage
	console.info("Using local mongodb compass database");
	uri = `mongodb://localhost:27017/${DB_NAME}`;
}

mongoose.connect(
	uri,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(error) => {
		if (error) {
			console.error(
				"Error connecting to the database",
				process.env.MONGODB_ATLAS_URI,
			);
			console.error(error);
		} else {
			console.log("Connected to database");
		}
	},
);
