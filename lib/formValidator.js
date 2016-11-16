'use strict';

var validation = require('../lib/validate');
var xss = require('xss');

/**
 * Validates a body (from request) against a form.
 * Takes care of XSS filtering.
 *
 * @param {array} form - Form to validate
 * @param {array} body - Body to validate
 * @returns {object} - Object with two values
                       processedForm: Validated, populated form
                       hasErrors: true if form has errors
 */
module.exports = function formValidator(form, body) {
  var hasErrors = false;
  var processedForm = [];

  form.forEach(function (f) {
    var field = {
      name: f.name,
      id: f.id,
      label: f.label,
      type: f.type,
      required: f.required,
      valid: f.valid
    };
    var value = xss(body[field.name]);
    var valid = true;

    if (field.required) {
        valid = validation.required(value);
    }

    field.value = value;
    field.valid = valid;

    hasErrors = hasErrors || !valid;
    processedForm.push(field);
  });

  return { hasErrors: hasErrors, processedForm: processedForm };
};