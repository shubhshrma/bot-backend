var mongoose = require('mongoose');
var ExamSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	subject: {
		type: String,
		required: true 
	},
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
	}
});

var Exam = module.exports = mongoose.model('Exam', ExamSchema);

module.exports.putExam = function(newExam, callback) {
	newExam.save(callback);
}

module.exports.getAllExams = function(branch, sem, date, boa, callback) {

	var isodate = new Date(date);
	if(boa==='before') Exam.find({ branch: branch, sem: sem, date: {$lte: isodate }}, callback);
	else if(boa==='after') Exam.find({ branch: branch, sem: sem, date: {$gte: isodate }}, callback);

}

