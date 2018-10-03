var express = require('express');
var router = express.Router();

var Exam = require('../models/exams');


//Get exams by filter
router.get('/:branch/:sem', function(req, res) {
	var branch = req.params.branch || 'IT';
	var sem = req.params.sem || 7;
	var date = req.query.date;
	var boa = req.query.boa;
	//console.log(typeof date, typeof boa);
	Exam.getAllExams(branch, sem, date, boa, (err, exams) => {
		if(err) throw err;
		console.log(exams);
		res.json(exams);	
	})
    
});


router.post('/put', function(req, res){
	console.log(req.body);
	var newExam = new Exam({
		title: req.body.title,
		date: new Date(req.body.date),
		branch: req.body.branch,
		sem: req.body.semester,
		subject: req.body.subject

	});
	Exam.putExam(newExam, (err, Exam) => {
		if(err) throw err;
		console.log(Exam);
		res.json({"success": true});
	});
	
});

module.exports = router; 