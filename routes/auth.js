var express = require('express');
var router = express.Router();

var passwordHash = require('password-hash');

var sqlUsers = require('../models/sql-user');

	router.get('/', redirectIfLoggedIn, function(req, res, next){
	res.render('login', {title: 'Forsíða'});
});
router.get('/login', function(req, res, next){
	res.render('login', {title: 'login'});
})

router.get('/signUp', function(req, res, next){
	res.render('signup', {title: 'signup'});
});
router.get('/logout', logoutHandler);

router.post('/login', loginHandler);
router.post('/signup', signUpHandler);

function logoutHandler(req, res){
	req.session.destroy(function(){
		res.redirect('/');
	});
}

function redirectIfLoggedIn(req, res, next) {
	if(req.session.user){
		res.redirect('/index'); //fara í leikinn
	} else{
		next();
	}
}

function loginHandler(req, res){
	var data = req.body;
	var pass = data.password;
	sqlUsers.findUser(data, function (err, result) {
      	if (passwordHash.verify(pass, result[0].hash)) {
      		req.session.regenerate(function(){
      			req.session.user = result[0].email;
      			res.redirect('/index');
      		});
      	} else {
      		res.send("neibb");
        //res.redirect('/signup', data);
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
