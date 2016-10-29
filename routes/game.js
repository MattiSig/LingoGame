var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');

router.get('/game', isLoggedIn, function(req, res, next) {
  res.render('game', { title: 'LingoDick' });
});

module.exports = router;