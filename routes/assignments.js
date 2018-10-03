var express = require('express');
var router = express.Router();

var Assignment = require('../models/assignments');
 

//Get assignments by filter
router.get('/:branch/:sem/:section', function(req, res) {
	var branch = req.params.branch || 'IT';
	var sem = req.params.sem || 7;
	var section = req.params.section || 'B';
	var date = req.query.date;
	var boa = req.query.boa;
	//console.log(typeof date, typeof boa);
	Assignment.getAllAssignments(branch, sem, section, date, boa, (err, assignments) => {
		if(err) throw err;
		console.log(assignments);
		res.json(assignments);	
	})
    
});

// router.get('/results', function(req, res){
// 	res.render(results);
// })

// router.get('/put', function(req, res){
// 	res.render('assignments-post');
// });

router.post('/put', function(req, res){
	console.log(req.body);
	var newAssignment = new Assignment({
		title: req.body.title,
		details: req.body.details,
		date: req.body.date,
		branch: req.body.branch,
		sem: req.body.semester,
		section: req.body.section

	});
	Assignment.putAssignment(newAssignment, (err, assignment) => {
		if(err) throw err;
		console.log(assignment);
	})
	res.json({"success": true});
});



module.exports = router;