var querystring = require('querystring');
var coerce = require('cli-native');
var validate = require('../validate');
var qs = require('cdb').util;
var stringify = require('../stringify');

/**
 *  Validate a query object against a schema
 *  descriptor.
 */
function valid(source, descriptor, options, cb) {
  return validate(source, descriptor, options, cb);
}

/**
 *  Determine if extra fields are present in the query
 *  string that are not declared in the descriptor.
 */
function extraneous(source, descriptor) {
  var keys = Object.keys(source);
  var fields = Object.keys(descriptor);
  for(var i = 0;i < keys.length;i++) {
    if(!~fields.indexOf(keys[i])) {
      return keys[i];
    }
  }
  return false;
}

/**
 *  Parse query options (array) into an object and optionally
 *  validate against a known schema.
 *
 *  @param value The array of query string parameter strings.
 *  @param descriptor A schema descriptor.
 *  @param req The program request object.
 *  @param next The callback function to invoke.
 */
function parse(value, descriptor, req, next) {
  var scope = this, log = this.log;
  var values = {}, o, k;
  // flatten array and parse query string format
  value.forEach(function(str) {
    str = str.replace(/^\?+/, '');
    var o = querystring.parse(str);
    for(k in o) {
      // convert to native types
      values[k] = coerce.to(o[k], ',');
    }
  })

  // if we have a schema warn if unknown
  // query string parameters are present
  if(descriptor) {
    var extra = extraneous(values, descriptor);
    if(extra) {
      log.warn('unknown query field %s', extra);
    }
  }

  // ensure that query string parameters
  // that *must* be JSON srting literals
  // are converted
  values = qs.stringify(values, stringify);

  //console.dir(values);

  // validate against schema descriptor
  if(descriptor) {
    valid(values, descriptor, function(errors, fields) {
      if(errors && errors.length) {
        log.warn(errors[0].message);
      }
      next.call(scope, values, errors, fields);
    })

  // otherwise just pass values back
  }else{
    next.call(scope, values, null, null);
  }
}

module.exports = parse;
