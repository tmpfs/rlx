var util = require('util');

var AbstractCouch = require('./abstract');
var CouchSession = require('./session');
var CouchConfig = require('./config');
var CouchError = require('./couch-error');

var types = require('./types');
var methods = require('./methods');
var keys = require('./keys');

var Server = function(options) {
  AbstractCouch.apply(this, arguments);
  this.session = new CouchSession(options);
  this.config = new CouchConfig(options);
}

util.inherits(Server, AbstractCouch);

/**
 *  Retrieve server information.
 */
Server.prototype.info = function(opts, cb) {
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
 *  Restart a server.
 */
Server.prototype.restart = function(opts, cb) {
  if(typeof opts === 'function') {
    cb = opts;
    opts = null;
  }
  opts = opts || {};
  var server = opts.server || this.options.server;
  var u = this.url([server, keys.restart]);
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json},
    method: methods.post};
  this.request(req, opts, cb);
}

/**
 *  Retrieve server statistics.
 */
Server.prototype.stats = function(opts, cb) {
  if(typeof opts === 'function') {
    cb = opts;
    opts = null;
  }
  opts = opts || {};
  var server = opts.server || this.options.server;
  var u = this.url([server, keys.stats]);
  var req = {url: u, headers: {Accept: types.json}};
  this.request(req, opts, cb);
}

/**
 *  Retrieve list of uuids.
 */
Server.prototype.uuids = function(opts, cb) {
  if(typeof opts === 'function') {
    cb = opts;
    opts = null;
  }
  opts = opts || {};
  var server = opts.server || this.options.server;
  var u = this.url([server, keys.uuids]);
  var req = {url: u, headers: {Accept: types.json}, qs: opts.qs};
  this.request(req, opts, cb);
}


/**
 *  List databases.
 */
Server.prototype.ls = function(opts, cb) {
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
Server.prototype.tasks = function(opts, cb) {
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
Server.prototype.log = function(opts, cb) {
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

Server.CouchError = CouchError;

module.exports = Server;
