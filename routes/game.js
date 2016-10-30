var express = require('express');
var router = express.Router();
var loggedInStatus = require('../lib/middleware/loggedInStatus');

router.get('/game', loggedInStatus.isLoggedIn, function(req, res, next) {
  res.render('game', { title: 'LingoDick' });
});

module.exports = router;