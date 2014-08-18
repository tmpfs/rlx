var assert = require('assert');
var schema = require('async-validate');

function validate(source, descriptor, options, cb) {
  var scope = this;
  if(typeof options === 'function') {
    cb = options;
    options = null;
  }
  assert(source, 'validation source must be an object');
  assert(descriptor, 'validation descriptor must be an object');
  assert(typeof cb === 'function', 'validation callback must be a function');
  options = options || {first: true, single: true};
  //if(!options.keys) options.keys = Object.keys(descriptor);
  var validator = new schema(descriptor);
  validator.validate(source, function(errors, fields) {
    cb.call(scope, errors, fields, source, descriptor, options);
  });
}

module.exports = validate;
