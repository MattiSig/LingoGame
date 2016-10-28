var query = require('./query');

module.exports.addUser =
function addUser(userData, cb){
	var values = [userData.email, userData.password1, userData.password2];
	console.log(values);
	var q ='INSERT INTO users(email, salt, hash) values($1, $2, $3)'

	query(q, values, function(err, result){
		if(err){
			return cb(err);
		} else {
			return cb(null, result);
		}
	})
}