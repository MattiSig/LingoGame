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

router.get('/', loggedInStatus.redirectIfLoggedIn, login);
router.get('/login', loggedInStatus.redirectIfLoggedIn, login);

router.get('/signUp', signup);
router.get('/logout', logoutHandler);

router.post('/login', loginHandler);
router.post('/signup', signUpHandler);

function logoutHandler(req, res){
	req.session.destroy(function(){
		res.redirect('/');
	});
}

function loginHandler(req, res){
	var pass = req.body.password;
	
	var data = formValidator(form, req.body);

	var hasErrors = data.hasErrors;
	var processedForm = data.processedForm;

	var info = {
		title: 'Login', 
		form: processedForm, 
		submitted: true,
		errors: hasErrors
	};
	if(!hasErrors){
		sqlUsers.findUser(processedForm[0].value, function (err, result) {
	      	if(result.length > 0){
  		      	if (passwordHash.verify(pass, result[0].hash)) {
  		      		req.session.regenerate(function(){
  		      			req.session.user = result[0].email;
  		      			res.redirect('/game');
  		      		});
  		      	} else {
  		      		info.title = 'Rangt lykilorð motherfucker';
  		      		res.render('login', info);
  		    	}
  		    } else {
  		    	info.title = 'Notandi fannst ekki';
  		    	res.render('login', info)
  		    }
	    });
	} else {
		info.title = 'Villa við innskráningu';
		res.render('login', info)
	}

}

function signUpHandler(req, res){
	var data = formValidator(form, req.body);

	var hasErrors = data.hasErrors;
	var processedForm = data.processedForm;

	var info = {
		title: 'SignUp',
		form: processedForm,
		submitted: true,
		errors: hasErrors
	};
	if(!hasErrors){
		sqlUsers.addUser(processedForm[0].value, processedForm[1].value, function (err, result) {
	      if (result) {
	        res.redirect('login');
	      } else {
	      	info.title = 'Email er þegar í notkun';
	        res.render('signup', info);
	      }
	    });
	} else {
		res.render('signup', info)
	}
}

module.exports = router;
