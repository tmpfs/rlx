var util = require('util');
var request = require('request');

var keys = {
  "dbs": "_all_dbs",
  "tasks": "_active_tasks",
  "log": "_log",
  "config": "_config"
}

var types = {
  json: 'application/json',
  text: 'text/plain'
}

var CouchError = function(doc, res) {
  this.doc = doc;
  this.res = res;
  this.reason = doc.reason || 'unknown_db_error';
  this.status = res.statusCode;
  Error.call(this);
}

util.inherits(CouchError, Error);

CouchError.prototype.getErrorKey = function() {
  return 'E' + this.reason.toUpperCase();
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
  var req = {url: u, qs: opts.qs};
  this.request(req, opts, cb);
}

/**
 *  Manage server configuration.
 */
Couch.prototype.config = function(opts, cb) {
  return {
    get: function(opts, cb) {
      if(typeof opts === 'function') {
        cb = opts;
        opts = null;
      }
      opts = opts || {};
      var server = opts.server || this.options.server;
      var parts = [server, keys.config];
      if(opts.section) parts.push(opts.section);
      if(opts.key) parts.push(opts.key);
      var u = this.url(parts);
      var req = {url: u, headers: {Accept: types.json}};
      this.request(req, opts, cb);
    }.bind(this),
    set: function(opts, cb) {
      if(typeof opts === 'function') {
        cb = opts;
        opts = null;
      }
      opts = opts || {};
      var server = opts.server || this.options.server;
      var parts = [server, keys.config];
      if(opts.section) parts.push(opts.section);
      if(opts.key) parts.push(opts.key);
      var u = this.url(parts);
      var req = {
        url: u,
        headers: {Accept: types.json, 'Content-Type': types.json},
        method: 'PUT',
        body: JSON.stringify(opts.value)};
      this.request(req, opts, cb);
    }.bind(this)
  }
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
  var json = res.headers['content-type'] === types.json;
  var doc = json ? this.deserialize(body) : body;
  if(doc instanceof Error) return cb(this.wrap(err, res));
  if(ok) {
    return cb(null, res, doc);
  }else{
    return cb(new CouchError(doc, res));
  }
}

Couch.prototype.request = function(req, opts, cb) {
  var scope = this;
  request(req, function(err, res, body) {
    scope.onResponse(err, res, body, cb, req, opts);
  })
}

Couch.CouchError = CouchError;

module.exports = Couch;
