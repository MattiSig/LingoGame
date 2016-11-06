var express = require('express');
var router = express.Router();
var loggedInStatus = require('../lib/middleware/loggedInStatus');
var formValidator = require('../lib/formValidator');
var sqlDictionary = require('../models/sql-dictionary');
var validation = require('../lib/validate');


var form = [
	{
		name: 'islenska',
		label: 'Íslenska',
		type: 'text',
		required: true,
		value: '',
		validation: [boundLengthValidation(1)],
		valid: false,
		validationString: 'Íslenskt orð þarf að vera a.m.k. 1 stafur'
	},
	{
		name: 'enska',
		label: 'Enska',
		type: 'text',
		required: true,
		value: '',
		validation: [boundLengthValidation(1)],
		valid: false,
		validationString: 'Enskt orð þarf að vera a.m.k. 1 stafur'
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

function addWordHandler(req, res){
	var body = {
		islenska: req.body.islenska, 
		enska: req.body.enska
	};
	var data = formValidator(form, body);

	var hasErrors = data.hasErrors;
	var processedForm = data.processedForm;

	var info = {
		title: 'Bæta við öðru orði',
		form: processedForm,
		submitted: true,
		errors: hasErrors
	};

	if(!hasErrors){
		sqlDictionary.addWord(req.body.difficulty, processedForm[0].value, processedForm[1].value, 
			function (err, result){
				if(result){
					info.form[0].value = '';
					info.form[1].value = '';
					res.render('addword', info);
				} else{
					info.title = 'Villa við skráningu';
					res.render('addword', info)
				}

		});
	}
}

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

function boundLengthValidation(n) {
  return function (s) {
    return validation.length(s, n);
  };
}

module.exports = router;