var query = require('./query');
var passwordHash = require('password-hash');

/**
* Inserts email and a hashed password into database
* @param {String} email - email address
* @param {String} password - String in english
* @param {function} cb - callback function
*/
module.exports.addUser =
function addUser(email, password, cb){
	var values = [email, passwordHash.generate(password), 1];
	var q ='INSERT INTO users(email, hash, level) values($1, $2, $3)'

	query(q, values, function(err, result){
		if(err){
			return cb(err);
		} else {
			return cb(null, result);
		}
	})
}

/**
* Looks for a users email address and password in database
* @param {String} email - email address
* @param {function} cb - callback function
*/
module.exports.findUser = 
function findUser(email, cb){
	var values = [email];
	var q = 'SELECT email, hash FROM users WHERE email = $1';

	query(q, values, function(err, result){
		if(err){
			return cb(err);
		} else {
			cb(null, result.rows);
		}
	});
}