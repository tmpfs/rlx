var util = require('util');

var AbstractCouch = require('./abstract');
var CouchSession = require('./session');
var CouchConfig = require('./config');
var CouchDatabase = require('./database');

var CouchError = require('./couch-error');

var types = require('./types');
var methods = require('./methods');
var keys = require('./keys');

var Server = function(options) {
  AbstractCouch.apply(this, arguments);
  this.session = new CouchSession(options);
  this.config = new CouchConfig(options);
  this.db = new CouchDatabase(options);
}

util.inherits(Server, AbstractCouch);

/**
 *  Retrieve server information.
 */
Server.prototype.info = function(opts, cb) {
  opts = this.merge(opts, cb);
  var req = {url: opts.server, headers: {Accept: types.json}};
  this.request(req, opts, opts.cb);
}

/**
 *  Restart a server.
 */
Server.prototype.restart = function(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, keys.restart]);
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json},
    method: methods.post};
  this.request(req, opts, opts.cb);
}

/**
 *  Retrieve server statistics.
 */
Server.prototype.stats = function(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, keys.stats]);
  var req = {url: u, headers: {Accept: types.json}};
  this.request(req, opts, opts.cb);
}

/**
 *  Retrieve list of uuids.
 */
Server.prototype.uuids = function(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, keys.uuids]);
  var req = {url: u, headers: {Accept: types.json}, qs: opts.qs};
  this.request(req, opts, opts.cb);
}

/**
 *  List databases.
 */
Server.prototype.ls = function(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, keys.dbs]);
  var req = {url: u, headers: {Accept: types.json}};
  this.request(req, opts, opts.cb);
}

/**
 *  Retrieve active tasks.
 */
Server.prototype.tasks = function(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, keys.tasks]);
  var req = {url: u, headers: {Accept: types.json}};
  this.request(req, opts, opts.cb);
}

/**
 *  Retrieve server log.
 */
Server.prototype.log = function(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, keys.log]);
  var req = {url: u, qs: opts.qs};
  this.request(req, opts, opts.cb);
}

/**
 *  Use a particular database.
 */
Server.prototype.use = function(name) {
  var opts = {};
  for(var z in this.options){opts[z] = this.options[z]};
  opts.db = name;
  return new CouchDatabase(opts);
}

Server.prototype.getErrorDocumentByStatusCode = function(code) {
  var doc = {code: code};
  switch(code) {
    case 400:
      doc.error = 'bad_request';
      break;
    case 404:
      doc.error = 'not_found';
      break;
  }
  return doc;
}

Server.CouchError = CouchError;

module.exports = Server;
