var express = require('express');
var router = express.Router();

var Assignment = require('../models/assignments');


//Get homepage
router.get('/', function(req, res) {
	Assignment.getAllAssignments('IT', 7, 'B', (err, assignments) => {
		if(err) throw err;
		console.log(assignments);
		res.render('assignments', {assignments: assignments});	
	})
    
});

// router.get('/results', function(req, res){
// 	res.render(results);
// })

router.get('/put', function(req, res){
	res.render('assignments-post');
});

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
	req.flash('success_msg', 'Your assignment is created.');
	res.redirect('/assignments/put');
});



module.exports = router;