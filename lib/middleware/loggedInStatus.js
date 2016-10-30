'use strict';

module.exports.isLoggedIn = 
function isLoggedIn(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports.redirectIfLoggedIn = 
function redirectIfLoggedIn(req, res, next) {
  if (req.session.user) {
    res.redirect('/game');
  } else {
    next();
  }
}