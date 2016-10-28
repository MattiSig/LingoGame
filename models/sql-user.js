var query = require('./query');
var passwordHash = require('password-hash');

module.exports.addUser =
function addUser(userData, cb){
	var values = [userData.email, passwordHash.generate(userData.password1)];
	console.log(values);
	var q ='INSERT INTO users(email, hash) values($1, $2)'

	query(q, values, function(err, result){
		if(err){
			return cb(err);
		} else {
			return cb(null, result);
		}
	})
}

module.exports.findUser = 
function findUser(userData, cb){
	var values = [userData.email];
	//console.log(values);
	var q = 'SELECT email, hash FROM users WHERE email = $1';

	query(q, values, function(err, result){
		if(err){
			return cb(err);
		} else {
			cb(null, result.rows);
		}
	});
}