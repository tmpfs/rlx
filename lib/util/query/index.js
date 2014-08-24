var url = require('url');
var cdb = require('cdb');
var parser = require('./parser');

var schemas = {
  'doc/ls': cdb.schema.viewquery,
  'doc/get': cdb.schema.docquery,
  'doc/head': cdb.schema.docquery,
  'doc/rev': cdb.schema.docquery,
}

/**
 *  Locate a schema by command request.
 */
function getSchema(req) {
  var cmd = req.result.unparsed[0];
  var sub = req.result.unparsed[1];
  var key = [cmd, sub].join('/');
  return schemas[key];
}

/**
 *  Extract a query string from some known options.
 */
function getQueryStringFromOption(req) {
  var query = [];
  var known = ['id', 'ddoc'], i, value, u;
  for(i = 0;i < known.length;i++) {
    value = this[known[i]];
    if(value && typeof value === 'string') {
      u = url.parse(value);
      if(u.search) {
        query.push(u.search);
        // ensure the value is updated with the query string removed
        this[known[i]] = u.pathname;
      }
    }
  }
  return query;
}

module.exports = function parse(req, next) {
  var query = this.query;

  // let's be kind and also accept query strings on some options
  if(!query.length) {
    query = getQueryStringFromOption.call(this, req);
  }

  // no --query option(s) specified
  if(!query.length) return next.call(this);


  //console.dir(req.result);
  //console.log('got query  string arg %j', query);
  var schema = getSchema.call(this, req);

  //console.log('got schema %s', schema);

  // validate against a known schema
  if(schema) {
    parser.call(this, query, schema, req, function(values, errors, fields) {
      req.query = Object.keys(values).length ? values : null;
      //console.log('qs values %j', values);
      next();
    });
  }
}
