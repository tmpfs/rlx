var request = require('request');
var CouchError = require('./couch-error');
var types = require('./types');

var AbstractCouch = function(options) {
  this.options = options || {};
  this.options.parser = this.options.parser || JSON.parse;
}

AbstractCouch.prototype.url = function(parts) {
  return parts.join('/');
}

AbstractCouch.prototype.deserialize = function(body) {
  var doc = null;
  try{
    doc = this.options.parser(body);
  }catch(e) {
    return e;
  }
  return doc;
}

AbstractCouch.prototype.wrap = function(err, res) {
  var status = res && res.statusCode ? res.statusCode : 500;
  var e = new Error(err.message);
  e.stack = err.stack;
  e.status = status;
  if(err.code) e.code = err.code;
  return e;
}

AbstractCouch.prototype.onResponse = function(err, res, body, cb, req, opts) {
  if(err) return cb(this.wrap(err, res));
  var ok = res.statusCode >= 200 && res.statusCode < 300;
  var json = res.headers['content-type'] === types.json;
  var doc = json ? this.deserialize(body) : body;
  if(doc instanceof Error) return cb(this.wrap(err, res));
  if(ok) {
    return cb(null, res, doc);
  }else{
    return cb(new CouchError(doc, res));
  }
}

AbstractCouch.prototype.request = function(req, opts, cb) {
  var scope = this;
  request(req, function(err, res, body) {
    scope.onResponse(err, res, body, cb, req, opts);
  })
}

AbstractCouch.prototype.merge = function(opts, cb) {
  var res = {};
  opts = opts || {};
  for(var z in opts) {res[z] = opts[z]};
  res.server = res.server || this.options.server;
  return res;
}

module.exports = AbstractCouch;
