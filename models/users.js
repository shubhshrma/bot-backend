var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = (newUser, callback) => {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(newUser.password, salt, function(err, hash) {
			newUser.password = hash;
			newUser.save(callback);
		});
	});
};


module.exports.getUserByUsername = function(username, callback) {
	var query = {username: username};
	User.findOne(query, callback);
};

module.exports.comparePassword = function(password, hash, callback) {
	bcrypt.compare(password, hash, function(err, isMatch) {
		if(err) throw err;
		callback(null, isMatch);
	});
};





