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
    label: 'Email',
    type: 'email',
    required: true,
    value: '',
    //validation: [boundLengthValidation(3)],
    valid: false,
    //validationString: 'Email þarf að vera a.m.k. þrír stafir'
  },
  {
    name: 'password1',
    label: 'Lykilorð',
    type: 'password',
    required: true,
    //validation: [boundLengthValidation(5)],
    valid: false,
    //validationString: 'Lykilorð þarf að vera a.m.k. fimm stafir'
  },
  {
  	name: 'password2',
  	label: 'Lykilorð aftur',
  	type: 'password',
  	required: true,
  	valid: false
  }
];

router.get('/', loggedInStatus.redirectIfLoggedIn, login);
router.get('/login', loggedInStatus.redirectIfLoggedIn, login);

router.get('/signUp', loggedInStatus.redirectIfLoggedIn, signup);
router.get('/logout', logoutHandler);

router.post('/login', loginHandler);
router.post('/signup', signUpHandler);

/**
* Renders login site
* @param {Object} req - request object
* @param {Object} res - response object
*/
function login(req, res){
	loginform = [form[0], form[1]];
	var info = {title: 'Login', form: loginform, submitted: false};
	res.render('login', info);
}

/**
* Renders signup site
* @param {Object} req - request object
* @param {Object} res - response object
*/
function signup(req, res){
	var info = {title:'SignUp', form: form, submitted: false};
	res.render('signup', info);
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
* Takes information from user and validates before handling
* when user is logging in
* @param {Object} req - request object
* @param {Object} res - response object
*/
function loginHandler(req, res){
	var pass = req.body.password1;
	
	var data = formValidator(form, req.body);

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
  		      		info.errorMessage = 'Rangt lykilorð motherfucker';
  		      		info.form = [form[0], form[1]];
  		      		res.render('login', info);
  		    	}
  		    } else {
  		    	info.errorMessage = 'Notandi fannst ekki';
  		    	info.form = [form[0], form[1]];
  		    	res.render('login', info)
  		    }
	    });
	} else {
		info.errorMessage = 'Villa við innskráningu';
		info.form = [form[0], form[1]];
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
			        res.redirect('login');
			      } else {
			      	info.errorMessage = 'Email er þegar í notkun';
			        res.render('signup', info);
			      }
			    });
		} else {
			info.errorMessage = 'Mismunandi lykilorð slegin inn';
			res.render('signup', info);
		}
	} else {
		res.render('signup', info)
	}
}

/**
* Takes information from user and validates before handling
* when user is logging in
* @param {Integer} n - an integer indicating length
* @return {function} - function that returns bool function
*/
/*function boundLengthValidation(n) {
  return function (s) {
    return validation.length(s, n);
  };
}*/
module.exports = router;