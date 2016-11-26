var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');

var sqlUsers = require('../models/sql-user');
var loggedInStatus = require('../lib/middleware/loggedInStatus')
var formValidator = require('../lib/formValidator');
var validation = require('../lib/validate');

var form = [
  {
    name: 'email',
    id: 'email',
    // label: 'Email',
    type: 'email',
    required: true,
    value: '',
    valid: false,
    placeholder: 'Email',
    class: 'input'
  },
  {
    name: 'password1',
    id: 'password1',
    // label: 'Lykilorð',
    type: 'password',
    required: true,
    valid: false,
    placeholder: 'Password',
    class: 'input'
  },
  {
  	name: 'password2',
  	id: 'password2',
  	// label: 'Lykilorð aftur',
  	type: 'password',
  	required: true,
  	valid: false,
    placeholder: 'Retype password',
    class: 'input'
  }
];
var loginForm = [form[0], form[1]];

router.get('/', loggedInStatus.redirectIfLoggedIn, login);
router.get('/login', loggedInStatus.redirectIfLoggedIn, login);

router.get('/signUp', loggedInStatus.redirectIfLoggedIn, signup);
router.get('/logout', logoutHandler);

router.post('/login', loginHandler);
router.post('/signup', signUpHandler);
router.post('/validate', formHandler);

/**
* Renders login site
* @param {Object} req - request object
* @param {Object} res - response object
*/
function login(req, res){
	var info = {title: 'Login', form: loginForm, submitted: false};
	res.render('login', info);
}

/**
* Renders signup site
* @param {Object} req - request object
* @param {Object} res - response object
*/
function signup(req, res){
	var info = {title:'SignUp', form: form, submitted: false};
	res.render('login', info);
}

/**
* Ends user session when logging out
* @param {Object} req - request object
* @param {Object} res - response object
*/
function logoutHandler(req, res){
	req.session.destroy(function(){
		res.redirect('/');
	});
}

/**
* Takes a request from an ajax call and sends back boolean value
* if a given input meets criteria
* @param {Object} req - request object
* @param {Object} res - response object
*/
function formHandler(req, res){
	var subject = req.body.value;
	var id = req.body.id;

	if(id==='email'){
		if(validation.isEmail(subject)){
			res.send(true);
		} else{
			res.send(false);
		}
	} else if((id === 'password1') || (id === 'password2')){
		if(validation.length(subject, 5)){
			res.send(true);
		} else {
			res.send(false);
		}
	}
}

/**
* Takes information from user and validates before handling
* when user is logging in
* @param {Object} req - request object
* @param {Object} res - response object
*/
function loginHandler(req, res){
	var pass = req.body.password1;
	var data = formValidator(loginForm, req.body);

	var formErrors = data.hasErrors;
	var validatedForm = data.processedForm;

	var info = {
		title: 'Login',
		form: validatedForm,
		submitted: true,
		errors: formErrors,
		errorMessage: ''
	};

	var email = validatedForm[0].value;

	if(!formErrors){
		sqlUsers.findUser(email, function (err, result) {
	      	if(result.length > 0){
  		      	if (passwordHash.verify(pass, result[0].hash)) {
  		      		req.session.regenerate(function(){
  		      			req.session.user = result[0].email;
  		      			res.redirect('/game');
  		      		});
  		      	} else {
  		      		info.errorMessage = 'Wrong password';
  		      		info.form = loginForm;
  		      		res.render('login', info);
  		    	}
  		    } else {
  		    	info.errorMessage = 'This user cannot be found.';
  		    	info.form = loginForm;
  		    	res.render('login', info)
  		    }
	    });
	} else {
		info.errorMessage = 'Wrong email or password!';
		info.form = loginForm;
		res.render('login', info)
	}

}

/**
* Takes information from user and validates before handling
* when a new user registers
* @param {Object} req - request object
* @param {Object} res - response object
*/
function signUpHandler(req, res){
	// console.log(req.body);
	var data = formValidator(form, req.body);

	var formErrors = data.hasErrors;
	var validatedForm = data.processedForm;

	var info = {
		title: 'SignUp',
		form: validatedForm,
		submitted: true,
		errors: formErrors,
		errorMessage: ''
	};

	var email = validatedForm[0].value;
	var password1 = validatedForm[1].value;
	var password2 = validatedForm[2].value;

	if(!formErrors){
		if(password1 === password2){
			sqlUsers.addUser(email, password1, function (err, result) {
			      if (result) {
			        res.send(true)
			      } else {
			      	info.errorMessage = 'This email is already in use.';
			        res.render('signup', info);
			      }
			    });
		} else {
			info.errorMessage = 'You have typed two different passwords.';
			res.render('signup', info);
		}
	} else {
		info.errorMessage = 'Something went wrong';
		res.render('signup', info)
	}
}

module.exports = router;
