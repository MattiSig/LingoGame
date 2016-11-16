var query = require('./query');

/**
* Inserts an icelandic word, it's english translation and the
* difficulty level of said word.
* @param {Integer} difficulty - Integer between 1-5
* @param {String} icelandic - String in icelandic
* @param {String} english - String in english
* @param {function} cb - callback function
*/
module.exports.addWord = 
function addWord(difficulty, icelandic, english, cb){
	var values = [difficulty, english, icelandic];
	var q = 'INSERT INTO dictionary(difficulty, enska, islenska) values($1, $2, $3)';

	query(q, values, function(err, result){
		if(err){
			return cb(err);
		} else {
			cb(null, result);
		}
	});

}

/**
* Selects 4 icelandic words randomly and their english translation,
* Word difficulty score is matched with users level
* @param {String} email - email address
* @param {function} cb - callback function
*/
module.exports.findWord =
function findWord(email, cb){
	var values = [email];
	var q = 'SELECT enska, islenska FROM dictionary WHERE difficulty = (SELECT level from users WHERE email = $1) ' +
			'ORDER BY RANDOM() LIMIT 4';

	query(q, values, function(err, result){
		if(err){
			return cb(err);
		} else{
			cb(null, result);
		}
	});

}
