'use strict';

/**
* Middleware that checks wether a session is in place
* @param {Object} req - request object
* @param {Object} res - response object
* @param {function} next - next function
*/
module.exports.isLoggedIn = 
function isLoggedIn(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

/**
* Middleware that redirects a user to game if he is logged in
* @param {Object} req - request object
* @param {Object} res - response object
* @param {function} next - next function
*/
module.exports.redirectIfLoggedIn = 
function redirectIfLoggedIn(req, res, next) {
  if (req.session.user) {
    res.redirect('/game');
  } else {
    next();
  }
}