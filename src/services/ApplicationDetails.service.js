//repository
const appDetailsRepositories = require("../repositories/AppicationDetails.repository");

const getAppDetailsService = async () => {
	try {
		const result = {
			details: await appDetailsRepositories.getAppDetailsRepository(),
			status: 200,
		};
		return result;
	} catch (error) {
		console.error("Try catch error caught");
		console.error(error);
		const result = {
			message: error.message || "Something went wrong",
			status: error.status || 500,
		};

		return result;
	}
};

module.exports = {
	getAppDetailsService,
};
