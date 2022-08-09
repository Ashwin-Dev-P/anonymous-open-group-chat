//Modules
const mongoose = require("mongoose");

//Models
const VisitorModel = mongoose.model("Visitor");

const findVisitorRepository = async (filter, select) => {
	const visitor = await VisitorModel.findOne(filter).select(select).lean();
	return visitor;
};
const saveVisitorRepository = async (visitor_obj) => {
	var visitor = await new VisitorModel(visitor_obj);
	await visitor.save();
};

const updateVisitorRepository = async (filter, update) => {
	await VisitorModel.updateOne(filter, update).lean();
};

module.exports = {
	saveVisitorRepository,
	findVisitorRepository,
	updateVisitorRepository,
};
