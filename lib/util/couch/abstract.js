var request = require('request');
var CouchError = require('./couch-error');
var types = require('./types');
var methods = require('./methods');

var MAX_STACK_SIZE = 32;
var stack = [];

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
  console.log('wrap error');
  var status = res && res.statusCode ? res.statusCode : 500;
  var e = new Error(err.message);
  e.stack = err.stack;
  e.status = status;
  if(err.code) e.code = err.code;
  return e;
}

AbstractCouch.prototype.ok = function(res) {
  return res.statusCode >= 200 && res.statusCode < 300;
}

AbstractCouch.prototype.getRequestBody = function(body) {
  if(typeof body !== 'string') {
    return JSON.stringify(body);
  }
  return body;
}

AbstractCouch.prototype.onResponse = function(err, res, body, cb, req, opts) {
  if(err) return cb(this.wrap(err, res));
  var ok = this.ok(res);
  var json = res.headers['content-type'] === types.json
    && req.method !== methods.head;
  var doc = json ? this.deserialize(body) : body;
  if(doc instanceof Error) return cb(this.wrap(err, res));
  if(ok) {
    return cb(null, res, doc);
  }else{
    return cb(new CouchError(doc, res), res);
  }
}

AbstractCouch.prototype.request = function(req, opts, cb, caller, name) {
  // store database requests so that
  // a request may be repeated after authentication
  if(caller && name) {
    console.log('adding caller to db stack %s', caller[name]);
    stack.push({caller: caller, name: name, req: req, opts: opts, cb: cb});
    if(stack.length > MAX_STACK_SIZE) {
      stack.shift();
    }
  }
  var scope = this;
  request(req, function(err, res, body) {
    scope.onResponse(err, res, body, cb, req, opts);
  })
}

AbstractCouch.prototype.merge = function(opts, cb) {
  if(typeof opts === 'function') {
    cb = opts;
    opts = null;
  }
  var res = {};
  opts = opts || {};
  for(var z in opts) {res[z] = opts[z]};
  res.server = res.server || this.options.server;
  res.cb = cb;
  return res;
}

module.exports = AbstractCouch;
