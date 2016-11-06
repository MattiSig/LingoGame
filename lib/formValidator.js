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
    // copy field
    var field = {
      name: f.name,
      label: f.label,
      type: f.type,
      required: f.required,
      validation: f.validation,
      validationString: f.validationString
    };

    var value = xss(body[field.name]);
    var valid = true;

    if (field.required) {
      valid = validation.required(value);
    }

    if (field.required || value !== '') {
      field.validation.forEach(function (validation) {
        var r = validation(value);
        valid = valid && r;
      });
    }

    field.value = value;
    field.valid = valid;

    // ef villa
    hasErrors = hasErrors || !valid;
    processedForm.push(field);
  });

  return { hasErrors: hasErrors, processedForm: processedForm };
};