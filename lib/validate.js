'use strict';

var validate = module.exports;

/**
 * Checks to see if `email` looks like an email or not.
 *
 * @param {string} email - string to check
 * @returns {bool} result - `true` if looks like email, otherwise `false`
 */
validate.isEmail = function (email) {
  if (!email) {
    return false;
  }

  var at = email.indexOf('@');
  var dot = email.indexOf('.');

  return at >= 0 && dot >= at;
};

/**
 * Requires `s` to contain a value, cannot only be whitespaces.
 *
 * @param {string} s - string to check
 * @returns {bool} result - `true` if contains value, otherwise `false`
 */
validate.required = function (s) {
  if (!s) {
    return false;
  }

  return s.trim() !== '';
};

/**
 * Checks to see if `s` is at least of length `n`
 *
 * @param {string} s - string to check
 * @param {number} n - minimum length of `s`
 * @returns {bool} result - `true` if looks like email, otherwise `false`
 */
function length(s, n) {
  
  // here we want to allow s to be the empty string so we can't check if falsy
  if (typeof s !== 'string') {
    return false;
  }

  // ditto for n
  if (typeof n !== 'number' || n < 0) {
    return false;
  }

  return s.length >= n;
}

validate.length = length;

/**
 * Checks to see if `s` looks like an address
 *
 * @param {string} s - string to check
 * @returns {bool} result - `true` if looks like address, otherwise `false`
 */
validate.address = function (s) {
  if (!s) {
    return false;
  }

  var parts = s.split(' ');

  return parts.length === 2 &&     // splitting on space gives us exactly two 
         length(parts[0], 1) &&    // first one is a string of length > 1
         /[0-9]+/.test(parts[1]); // followed by a number
};

/**
 * Checks to see if `s` is one of the values in array
 *
 * @param {string} s - string to check
 * @param {array} array - array to check in
 * @returns {bool} result - `true` if `s` in `array, otherwise `false`
 */
function oneOf(s, array) {
  if (typeof s !== 'string' || !Array.isArray(array)) {
    return false;
  }

  // weird case but kinda makes sense
  if (s.length === 0 && array.length === 0) {
    return true;
  }

  return array.indexOf(s) >= 0;
}

validate.oneOf = oneOf;

 /**
 * Checks to see if `s` looks like a phonenumber
 * Allows spaces and dash to separate
 * Must start with 4, 5, 6, 7 or 8
 * Must be seven numbers
 *
 * @param {string} s - string to check
 * @returns {bool} result - `true` if looks like a phonenumber otherwise `false`
 */
validate.phonenumber = function (s) {
  if (!s) {
    return false;
  }

  var starts = ['4', '5', '6', '7', '8'];

  s = s.replace(/ |\-/g, '');

  return /[0-9]{7}/.test(s) &&
         oneOf(s[0], starts);
};