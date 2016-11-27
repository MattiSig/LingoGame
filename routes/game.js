var express = require('express');
var router = express.Router();
var loggedInStatus = require('../lib/middleware/loggedInStatus');
var formValidator = require('../lib/formValidator');
var sqlDictionary = require('../models/sql-dictionary');
var sqlUser = require('../models/sql-user');
var validation = require('../lib/validate');

router.get('/game', loggedInStatus.isLoggedIn, function(req, res) {
  res.render('game', { title: 'LingoDick' });
});

router.get('/addword', loggedInStatus.isLoggedIn, function(req, res){
	var info = {title: 'Bæta við orði', form: form, submitted: false};
	res.render('addword', info);
});

router.post('/addword', loggedInStatus.isLoggedIn, addWordHandler);
router.get('/getword', getWordHandler);
router.post('/updatelevel', updateLevel);
router.post('/updatescore', updateScore);
router.get('/getLevel', getLevel);
router.get('/getScore', getScore);


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
			res.send(result.rows);
		} else{
			res.redirect('/addword');
		}
	})
}

/**
* Increments or decrements user level by 1 in database
* @param {Object} req - request object
* @param {Object} res - response object
*/
function updateLevel(req, res){

	if(req.body.toIncrement==='1'){
		var booleIncrement = new Boolean(true);
	} else{
		var booleIncrement = new Boolean(false);
	}

	sqlUser.updateUserLevel(req.session.user, booleIncrement, function(err, result){
		if(result){
			console.log(booleIncrement);
			res.send('success');
		} else{
			console.log('eitthvað er að');
			res.send('not success');
		}
	});
}

/**
* Receives user level upon request from game and sends to game
* @param {Object} req - request object
* @param {Object} res - response object
*/
function getLevel(req, res){
	sqlUser.getUserLevel(req.session.user, function(err, result){
		if(result){
			res.send(result.rows[0]);
		} else{
			res.send('shit');
		}
	})
}

/**
* Receives an array with 5 objects containing email and 
* user score for top 5 score results 
* @param {Object} req - request object
* @param {Object} res - response object
*/
function getScore(req, res){
	sqlUser.getUserScore(function(err, result){
		if(result){
			res.send(result.rows);
		} else{
			res.send('shit')
		}
	});
}

/**
* Updates user score in database upon request
* @param {Object} req - request object
* @param {Object} res - response object
*/
function updateScore(req, res){
	var score = req.body.score;
	sqlUser.updateUserScore(req.session.user, score, function(err, result){
		if(result){
			res.send(result.rows);
		} else{
			res.send('shit');
		}
	});
}

//Variable passed to view for rendering and handling data
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
		id: 'islenska'
	},
	{
		name: 'enska',
		label: 'Enska',
		type: 'text',
		required: true,
		value: '',
		valid: false,
		id: 'enska'
	}
];

module.exports = router;