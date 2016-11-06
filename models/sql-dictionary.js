var query = require('./query');

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
