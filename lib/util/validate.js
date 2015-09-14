var assert = require('assert');
var Schema = require('async-validate');

require('async-validate/plugin/all');

function validate(source, descriptor, options, cb) {
  var scope = this;
  if(typeof options === 'function') {
    cb = options;
    options = null;
  }
  assert(source, 'validation source must be an object');
  assert(descriptor, 'validation descriptor must be an object');
  assert(typeof cb === 'function', 'validation callback must be a function');
  options = options || {bail: true};
  //if(!options.keys) options.keys = Object.keys(descriptor);
  var validator = new Schema(descriptor);
  validator.validate(source, options, function(err, res) {
    cb.call(
      scope,
      res ? res.errors : [],
      res ? res.fields : {}, source, descriptor, options);
  });
}

module.exports = validate;
