var query = require('./query');

module.exports.addWithButton = 
function addWithButton(cb){
	var values = [makeid(), true];
	var q = "INSERT INTO items(text, complete) values($1, $2)"

	query(q, values, function(err, result) {
		if(err){
			return cb(err);
		}
		else {
			return cb(null, result);
		}
	})
};

function makeid()
{
    var text = "$$";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}