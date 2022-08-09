const visitorRepositories = require("../repositories/Visitor.repository");

const saveVisitorService = async (ipAddress, userAgent) => {
	try {
		const filter = {
			ipAddress: ipAddress,
			userAgent: userAgent,
		};

		const select = "visits -_id";

		await visitorRepositories.findVisitorRepository(filter, select).then(
			async (result) => {
				if (!result) {
					//visiting the first time
					const visitor_obj = {
						ipAddress: ipAddress,
						userAgent: userAgent,
						visits: [Date.now()],
					};

					await visitorRepositories.saveVisitorRepository(visitor_obj);
				} else {
					//recurrent visit so update visit timestamp
					updated_visits = [...result.visits, Date.now()];

					const update = {
						$set: {
							visits: updated_visits,
						},
					};
					await visitorRepositories.updateVisitorRepository(filter, update);
				}
			},
			(error) => {
				console.error(
					"Error when checking id the visitor details already exist",
				);
				console.error(error);
			},
		);
	} catch (error) {
		console.error("Try catch error caught");
		console.error(error);
	}
};

module.exports = {
	saveVisitorService,
};
