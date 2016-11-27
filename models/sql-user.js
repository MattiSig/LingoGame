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
	var values = [email, passwordHash.generate(password), 1, 0];
	var q ='INSERT INTO users(email, hash, level, score) values($1, $2, $3, $4)'

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
			return cb(null, result.rows);
		}
	});
}

module.exports.getUserLevel =
function getUserLevel(email, cb){
	var values = [email];
	var q = 'SELECT level FROM users WHERE email = $1';

	query(q, values, function(err, result){
		if(err){
			return cb(err);
		} else {
			return cb(null, result);
		}
	});
}

module.exports.getUserScore =
function getUserScore(cb){
	var q = 'SELECT email, score FROM users ORDER BY score DESC LIMIT 5';

	query(q, null, function(err, result){
		if(err){
			console.log('1');
			return cb(err);
		} else{
			console.log('2');
			return cb(null, result);
		}
	});
}

module.exports.updateUserScore =
function updateUserScore(email, score, cb){
	var values = [score, email];
	var q = 'UPDATE users SET score = score + $1 WHERE email = $2';

	query(q, values, function(err, result){
		if(err){
			return cb(err);
		} else{
			return cb(null, result);
		}
	});
}

module.exports.updateUserLevel = 
function updateUserLevel(email, toIncrement, cb){
	var values = [email]

	if(toIncrement){
		console.log('heftari');
		var q = 'UPDATE users SET level = level + 1 WHERE email = $1 AND level != 5';
	} else {
		console.log('gatari');
		var q = 'UPDATE users SET level = level - 1 WHERE email = $1 AND level != 1';
	}

	query(q, values, function(err, result){
		if(err){
			return cb(err);
		} else {
			return cb (null, result);
		}

	});
}
