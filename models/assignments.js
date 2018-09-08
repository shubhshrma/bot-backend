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
module.exports.getAllAssignments = function(branch, sem, section, callback) {

	if(section) Assignment.find({ branch: branch, sem: sem, section:section }, callback);
	else Assignment.find({ branch: branch, sem: sem }, callback);

}

//All assignments according to branch and sem before given date
module.exports.getAssignmentsByDate = function(branch, sem, section, date, callback) {

	if(section) Assignment.find({ branch: branch, sem: sem, section:section, date: {$lt: date} }, callback);
	else Assignment.find({ branch: branch, sem: sem, date: {$lt: date} }, callback);

}