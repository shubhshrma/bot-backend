var express = require('express');
var router = express.Router();

const jwt = require("jsonwebtoken");
var User = require('../models/users');

//Register user
router.post('/register', function(req, res) {
	var name = req.body.name;
	var username = req.body.username;
	var password = req.body.password;

	User.getUserByUsername(username, function(err, user){
		console.log(user);
		if(user){
			res.status(409).json({
          		message: "Username exists"
    		});
		}
		else{
			var newUser = new User({
				name: name,
				username: username,
				password: password
			});

			User.createUser(newUser, function(err, user){
				if(err) {
					console.log(err);
					res.status(500).json({error: err});

				}
				else{
					console.log(user);
					res.json({message: "User created"});
				}
			});
		}
	})
});

//Login
router.post('/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	User.getUserByUsername(username, function(err ,user){
		if(user.length == 0){
			return res.status(401).json({
          		message: "Authentication Failed"
    		});
		}
		else{
			User.comparePassword(password, user.password, function(err, isMatch) {
		    	if(err) res.status(500).json({error: err});
		    	else if(isMatch) {
		    		const token = jwt.sign(
		            {
		              username: user.email,
		              name: user.name
		            },
		            'verysecretsecret',
		            {
		                expiresIn: "1h"
		            }
		          );
		          res.status(200).json({
		            message: "Authentication successful",
		            token: token
		          });
		    	}
		    	else{
		    		res.status(401).json({
		          		message: "Authentication Failed"
		    		});
		    	}
		    });
		}
	})
});

module.exports = router;