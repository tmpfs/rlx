var url = require('url');
var querystring = require('querystring');
var cli = require('cli-command');
var coerce = cli.native;
var descriptor = require('../schema/params/query/document/get');
var validate = require('./validate');

function parse(value, req, next) {
  //console.log('parse id query string....');
  var log = this.log;
  var k, query;
  var u = url.parse(value, true, true);
  //console.dir(u);
  value = u.pathname;
  this.id = value;
  // got some query string info
  if(u.search) {
    query = u.query;
    // convert to native types
    for(k in query) {
      query[k] = coerce.to(query[k]);
    }
    console.dir(query);
    req.query.id = query;
    validate(query, descriptor, function(errors, fields) {
      console.log('validate errs %j', errors);
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
