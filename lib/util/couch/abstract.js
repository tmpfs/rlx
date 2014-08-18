var assert = require('assert');
var url = require('url');
var querystring = require('querystring');
var request = require('request');
var CouchError = require('./couch-error');
var types = require('./types');
var methods = require('./methods');

var MAX_STACK_SIZE = 32;
var stack = [];

// user keeps track of current authenticated user
// by server key, cookie tracks cookie headers by server key and user
var auth = {
  user: {},
  cookie: {}
};

var AbstractCouch = function(options) {
  this.options = options || {};
  this.options.parser = this.options.parser || JSON.parse;
  this.auth = auth;
}

AbstractCouch.prototype.url = function(parts) {
  var server = parts.shift();
  parts = parts.map(function(value) {
    return querystring.escape(value);
  })
  parts.unshift(server);
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

AbstractCouch.prototype.getServerKey = function(u) {
  var ru = url.parse(u);
  return ru.protocol + '//' + ru.host;
}

AbstractCouch.prototype.wrap = function(err, res) {
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

/**
 *  Repeat the last database request.
 *
 *  @param cb Replace the stashed callback function (optional).
 */
AbstractCouch.prototype.repeat = function(cb) {
  var last = stack.pop();
  if(last) {
    var opts = last.opts;
    cb = cb || last.cb;
    //console.log('repeat request %s', cb);
    opts.retries = opts.retries || 0;
    opts.retries++;
    return this.request(last.req, opts, cb);
  }
  throw new Error('no request available to repeat');
}

AbstractCouch.prototype.request = function(req, opts, cb, stash) {
  // store database requests so that
  // a request may be repeated after authentication
  if(stash && !opts.retries) {
    stack.push({req: req, opts: opts, cb: cb});
    if(stack.length > MAX_STACK_SIZE) {
      stack.shift();
    }
  }
  var scope = this;
  //console.log('[%s] url %s', req.method || 'GET', req.url);
  var key = this.getServerKey(req.url);
  var user = this.auth.user[key];
  //console.log('key %s', key);
  //console.log('user %s', user);
  if((req.headers && !req.headers.cookie)
    && user && this.auth.cookie[key][user]) {
    req.headers.cookie = this.auth.cookie[key][user];
  }
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
