var express = require('express');
var router = express.Router();
var loggedInStatus = require('../lib/middleware/loggedInStatus');
var formValidator = require('../lib/formValidator');
var sqlDictionary = require('../models/sql-dictionary');
var sqlUser = require('../models/sql-user');
var validation = require('../lib/validate');


var form = [
	{
		name: 'difficulty',
		label: '1',
		type: 'radio',
		value: 1,
		id: 'button1'
	},
	{
		name: 'difficulty',
		label: '2',
		type: 'radio',
		value: 2,
		id: 'button2'
	},
	{
		name: 'difficulty',
		label: '3',
		type: 'radio',
		value: 3,
		id: 'button3'
	},
	{
		name: 'difficulty',
		label: '4',
		type: 'radio',
		value: 4,
		id: 'button4'
	},
	{
		name: 'difficulty',
		label: '5',
		type: 'radio',
		value: 5,
		id: 'button5'
	},
	{
		name: 'islenska',
		label: 'Íslenska',
		type: 'text',
		required: true,
		value: '',
		valid: false,
	},
	{
		name: 'enska',
		label: 'Enska',
		type: 'text',
		required: true,
		value: '',
		valid: false,
	}
];

router.get('/game', loggedInStatus.isLoggedIn, function(req, res) {
  res.render('game', { title: 'LingoDick' });
});

router.get('/addword', loggedInStatus.isLoggedIn, function(req, res){
	var info = {title: 'Bæta við orði', form: form, submitted: false};
	res.render('addword', info);
});

router.post('/addword', loggedInStatus.isLoggedIn, addWordHandler);
router.post('/getword', loggedInStatus.isLoggedIn, getWordHandler);
router.post('/updatelevel', updateLevel);

/**
* Takes information from user and validates before handling
* when user is adding a new word to database
* @param {Object} req - request object
* @param {Object} res - response object
*/
function addWordHandler(req, res){
	var body = {
		islenska: req.body.islenska, 
		enska: req.body.enska
	};
	var formToValidate = [form[5], form[6]];
	var data = formValidator(formToValidate, body);
	var formErrors = data.hasErrors;
	var validatedForm = data.processedForm;

	var info = {
		title: 'Bæta við öðru orði',
		form: validatedForm,
		submitted: true,
		errors: formErrors
	};

	if(!formErrors){
		sqlDictionary.addWord(req.body.difficulty, validatedForm[0].value, validatedForm[1].value, 
			function (err, result){
				if(result){
					info.form[0].value = '';
					info.form[1].value = '';
					info.form = form;
					res.render('addword', info);
				} else{
					info.title = 'Villa við skráningu';
					info.form = form;
					res.render('addword', info)
				}

		});
	}
}

/**
* Handles request for new words from game
* @param {Object} req - request object
* @param {Object} res - response object
*/
function getWordHandler(req, res){

	sqlDictionary.findWord(req.session.user, function(err, result){
		if(result){
			console.log(result.rows);
			res.redirect('/addword');
		} else{
			res.redirect('/addword');
		}
	})
}

function updateLevel(req, res){
	var testBool = false;//Math.random() < 0.5;
	sqlUser.updateUserLevel(req.session.user, testBool, function(err, result){
		if(result){
			console.log(result);
			console.log(testBool);
			res.redirect('/addword');
		} else{
			console.log('eitthvað er að');
			res.redirect('/addword');
		}
	})
}

module.exports = router;