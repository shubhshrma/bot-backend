var mongoose = require('mongoose');
var AssignmentSchema = mongoose.Schema({
	title: {
		type: String,
		unique: true,
		required: true
	},
	details: String,
	date: {
		type: Date,
		required: true
	},
	branch:{
		type: String,
		required: true,

	},
	sem: {
		type: Number,
		required: true
	},
	section: String
});

var Assignment = module.exports = mongoose.model('Assignment', AssignmentSchema);

module.exports.putAssignment = function(newAssignment, callback) {
	newAssignment.save(callback);
}

//All assignments according to branch, sem without date
module.exports.getAllAssignments = function(branch, sem, section, date, boa, callback) {

	var isodate = new Date(date);
	if(boa==='before') Assignment.find({ branch: branch, sem: sem, section:section, date: {$lte: isodate }}, callback);
	else if(boa==='after') Assignment.find({ branch: branch, sem: sem, section:section, date: {$gte: isodate }}, callback);

}

