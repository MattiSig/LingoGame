var express = require('express');
var router = express.Router();

var prufa = require('../models/post-prufa');
var isLoggedIn = require('../middleware/isLoggedIn');

/* GET home page. */
router.get('/index', isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/asdf', prufuButton);

function prufuButton(req, res){
	prufa.addWithButton(function (err, result) {
      if (result) {
        res.send(); //má vel senda til baka JSON t.d.
      } else {
        res.render('/', data);
      }
    });
}


module.exports = router;
