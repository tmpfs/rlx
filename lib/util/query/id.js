var url = require('url');
var querystring = require('querystring');
var cli = require('cli-command');
var coerce = cli.native;
var descriptor = require('../schema/params/query/document/get');
var validate = require('./validate');

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

function parse(value, req, next) {
  var name = 'id';
  var k, query, log = this.log;
  var u = url.parse(value, true, true);
  value = u.pathname;
  var arg = this.options()[name] || name;
  this[name] = value;
  // got some query string info
  if(u.search) {
    query = u.query;
    // convert to native types
    for(k in query) {
      query[k] = coerce.to(query[k]);
    }
    req.query.id = query;
    var extra = extraneous(query, descriptor);
    if(extra) {
      log.warn('unknown query field %s for %s', extra, arg.toString(null));
    }
    validate(query, descriptor, function(errors, fields) {
      if(errors && errors.length) {
        log.warn(errors[0].message);
      }
      next();
    })
  }else{
    next();
  }
}

module.exports = parse;
