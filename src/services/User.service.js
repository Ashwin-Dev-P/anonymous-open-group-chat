const userRepositories = require("../repositories/User.repository");
const setJWT = require("../utils/user/setJWT");

const createUserService = async (username, ipAddress, userAgent) => {
	try {
		const success = async (_id) => {
			return setJWT(_id);
		};
		const error = async (error) => {
			console.error("Unable to get user id\n", error);
			return null;
		};

		const user_obj = {
			username: username,
			ipAddress: ipAddress,
			userAgent: userAgent,
		};
		const jwtToken = userRepositories
			.createUserRepository(user_obj)
			.then(success, error);

		return jwtToken;
	} catch (error) {
		console.error("Try catch error caught");
		console.error(error);

		return null;
	}
};

module.exports = {
	createUserService,
};
