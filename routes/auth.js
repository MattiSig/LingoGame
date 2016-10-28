var express = require('express');
var router = express.Router();

var sqlUsers = require('../models/sql-user');

router.get('/skitur', redirectIfLoggedIn, function(req, res, next){
	res.render('signup', {title: 'óvæntadótið'});
});

router.get('/login', function(req, res, next){
	res.render('login', {title: 'login'});
})

router.get('/signUp', function(req, res, next){
	res.render('signup', {title: 'signup'});
});

router.post('/login', loginHandler);
router.post('/signup', signUpHandler);

function redirectIfLoggedIn(req, res, next) {
	if(1===1){
		res.redirect('/login'); //fara í leikinn
	} else {
		next();
	}
}

function loginHandler(req, res){
	var data = req.body;
	sqlUsers.findUser(data, function (err, result) {
      if (result) {
        res.render('login', {title: "whatever"}); //má vel senda til baka JSON t.d.
      } else {
        res.redirect('/signup', data);
      }
    });

}

function signUpHandler(req, res){
	var data = req.body;
	sqlUsers.addUser(data, function (err, result) {
      if (result) {
        res.send("skráning tókst"); //má vel senda til baka JSON t.d.
      } else {
        res.redirect('/signup', data);
      }
    });
}

module.exports = router;