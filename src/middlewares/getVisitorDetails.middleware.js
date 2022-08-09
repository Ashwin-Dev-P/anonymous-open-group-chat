const visitorServices = require("../services/Visitor.service");

const getVisitorDetailsMiddleware = async function (req, res, next) {
	const userAgent = req.headers["user-agent"];
	const ipAddress =
		req.headers["x-forwarded-for"] || req.ip || req.socket.localAddress;

	await visitorServices.saveVisitorService(ipAddress, userAgent);

	next();
};

module.exports = getVisitorDetailsMiddleware;
