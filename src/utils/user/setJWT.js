//To enable .env file
require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });

const jwt = require("jsonwebtoken");

async function setJWT(_id) {
	console.time("jwt signing time");

	const JWT_SECRET = process.env.JWT_SECRET;

	const jwtData = { _id: _id };
	const token = await jwt.sign(jwtData, JWT_SECRET);

	console.timeEnd("jwt signing time");

	return token;
}

module.exports = setJWT;
