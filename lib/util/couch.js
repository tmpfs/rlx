var request = require('request');

var keys = {
  "dbs": "_all_dbs",
  "tasks": "_active_tasks",
  "log": "_log"
}

var types = {
  json: 'application/json',
  text: 'text/plain'
}

var Couch = function(options) {
  this.options = options || {};
}

/**
 *  Retrieve server information.
 */
Couch.prototype.info = function(opts, cb) {
  if(typeof opts === 'function') {
    cb = opts;
    opts = null;
  }
  opts = opts || {};
  var server = opts.server || this.options.server;
  var req = {url: server, headers: {Accept: types.json}};
  this.request(req, opts, cb);
}

/**
 *  List databases.
 */
Couch.prototype.ls = function(opts, cb) {
  if(typeof opts === 'function') {
    cb = opts;
    opts = null;
  }
  opts = opts || {};
  var server = opts.server || this.options.server;
  var u = this.url([server, keys.dbs]);
  var req = {url: u, headers: {Accept: types.json}};
  this.request(req, opts, cb);
}

/**
 *  Retrieve active tasks.
 */
Couch.prototype.tasks = function(opts, cb) {
  if(typeof opts === 'function') {
    cb = opts;
    opts = null;
  }
  opts = opts || {};
  var server = opts.server || this.options.server;
  var u = this.url([server, keys.tasks]);
  var req = {url: u, headers: {Accept: types.json}};
  this.request(req, opts, cb);
}

/**
 *  Retrieve server log.
 */
Couch.prototype.log = function(opts, cb) {
  if(typeof opts === 'function') {
    cb = opts;
    opts = null;
  }
  opts = opts || {};
  var server = opts.server || this.options.server;
  var u = this.url([server, keys.log]);
  var req = {url: u};
  this.request(req, opts, cb);
}


// PRIVATE

Couch.prototype.url = function(parts) {
  return parts.join('/');
}

Couch.prototype.deserialize = function(body) {
  var doc = null;
  try{
    doc = JSON.parse(body);
  }catch(e) {
    return e;
  }
  return doc;
}

Couch.prototype.wrap = function(err, res) {
  var status = res && res.statusCode ? res.statusCode : 500;
  var e = new Error(err.message);
  e.stack = err.stack;
  e.status = status;
  if(err.code) e.code = err.code;
  return e;
}

Couch.prototype.onResponse = function(err, res, body, cb, req, opts) {
  if(err) return cb(this.wrap(err, res));
  var ok = res.statusCode >= 200 && res.statusCode < 300;
  if(ok) {
    var json = res.headers['content-type'] === types.json;
    var doc = json ? this.deserialize(body) : body;
    if(doc instanceof Error) return cb(this.wrap(err, res));
    return cb(null, res, doc);
  }
}

Couch.prototype.request = function(req, opts, cb) {
  var scope = this;
  request(req, function(err, res, body) {
    scope.onResponse(err, res, body, cb, req, opts);
  })
}

module.exports = Couch;
