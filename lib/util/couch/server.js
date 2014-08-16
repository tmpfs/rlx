var util = require('util');
var request = require('request');

var AbstractCouch = require('./abstract');
var CouchError = require('./couch-error');

var types = require('./types');
var methods = require('./methods');
var keys = require('./keys');

var Server = function(options) {
  AbstractCouch.apply(this, arguments);
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

/**
 *  Manage server configuration.
 */
Server.prototype.config = function(opts, cb) {
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
        method: methods.put,
        body: JSON.stringify(opts.value)};
      this.request(req, opts, cb);
    }.bind(this),
    rm: function(opts, cb) {
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
      var req = {url: u, headers: {Accept: types.json}, method: methods.delete};
      this.request(req, opts, cb);
    }.bind(this),
  }
}

/**
 *  Manage session authentication.
 */
Server.prototype.session = function(opts, cb) {
  return {
    get: function(opts, cb) {
      if(typeof opts === 'function') {
        cb = opts;
        opts = null;
      }
      opts = opts || {};
      var server = opts.server || this.options.server;
      var parts = [server, keys.session];
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
      var parts = [server, keys.session];
      var u = this.url(parts);
      var body = {username: opts.username, password: opts.password};
      var req = {
        url: u,
        headers: {Accept: types.json, 'Content-Type': types.json},
        method: methods.post,
        body: JSON.stringify(body)
      };
      this.request(req, opts, cb);
    }.bind(this),
    rm: function(opts, cb) {
      if(typeof opts === 'function') {
        cb = opts;
        opts = null;
      }
      opts = opts || {};
      var server = opts.server || this.options.server;
      var parts = [server, keys.session];
      var u = this.url(parts);
      var req = {url: u, headers: {Accept: types.json}, method: methods.delete};
      this.request(req, opts, cb);
    }.bind(this),
  }
}

Server.CouchError = CouchError;

module.exports = Server;
