var assert = require('assert');
var util = require('util');

var AbstractCouch = require('./abstract');
var Document = require('./document');
var types = require('./types');
var methods = require('./methods');
var keys = require('./keys');

var Database = function(options) {
  AbstractCouch.apply(this, arguments);
  this.doc = Document(this);
}

util.inherits(Database, AbstractCouch);

/**
 *  Retrieve all documents for a database.
 */
Database.prototype.all = function(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, opts.db, keys.docs]);
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json},
    qs: opts.qs
  };
  this.request(req, opts, opts.cb);
}

/**
 *  Retrieve database information.
 */
Database.prototype.info = function(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, opts.db]);
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json}};
  this.request(req, opts, opts.cb);
}

/**
 *  Check existence of a database.
 */
Database.prototype.exists = function(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, opts.db]);
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json},
    method: methods.head};
  this.request(req, opts, opts.cb);
}

/**
 *  Create a database.
 */
Database.prototype.create = function(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, opts.db]);
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json},
    method: methods.put};
  this.request(req, opts, opts.cb);
}

/**
 *  Create a database.
 */
Database.prototype.create = function(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, opts.db]);
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json},
    method: methods.put};
  this.request(req, opts, opts.cb);
}

/**
 *  Remove a database.
 */
Database.prototype.rm = function(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, opts.db]);
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json},
    method: methods.delete};
  this.request(req, opts, opts.cb);
}

/**
 *  Ensure full commit.
 */
Database.prototype.commit = function(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, opts.db, keys.commit]);
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json},
    method: methods.post};
  this.request(req, opts, opts.cb);
}

/**
 *  Compact a database and optionally a specific design document.
 */
Database.prototype.compact = function(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, opts.db, keys.compact]);
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json},
    method: methods.post};
  this.request(req, opts, opts.cb);
}

/**
 *  Remove stale view indices.
 */
Database.prototype.cleanup = function(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, opts.db, keys.cleanup]);
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json},
    method: methods.post};
  this.request(req, opts, opts.cb);
}

/**
 *  Get or set the database revisions limit.
 */
Database.prototype.limit = function(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, opts.db, keys.limit]);
  var limit = opts.limit;
  if(limit) {
    assert(typeof limit === 'number', 'limit must be a number');
  }
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json},
    method: limit ? methods.put : methods.get};
  if(limit) req.body = JSON.stringify(limit);
  this.request(req, opts, opts.cb);
}

Database.prototype.security = function() {
  var o = {};
  o.get = function(opts, cb) {
    opts = this.merge(opts, cb);
    var u = this.url([opts.server, opts.db, keys.security]);
    var req = {
      url: u,
      headers: {Accept: types.json, 'Content-Type': types.json}};
    this.request(req, opts, opts.cb);
  }.bind(this);
  o.set = function(opts, cb) {
    opts = this.merge(opts, cb);
    var u = this.url([opts.server, opts.db, keys.security]);
    assert(opts.body, 'body document required to set security object')
    if(typeof opts.body !== 'string') {
      opts.body = JSON.stringify(opts.body);
    }
    var req = {
      url: u,
      headers: {Accept: types.json, 'Content-Type': types.json},
      method: methods.put,
      body: opts.body
    };
    this.request(req, opts, opts.cb);
  }.bind(this);
  return o;
}

// PRIVATE
Database.prototype.merge = function(opts, cb) {
  var res = AbstractCouch.prototype.merge.apply(this, arguments);
  res.db = opts.db || this.options.db;
  assert(res.db, 'database name must be specified');
  return res;
}

// ALIAS
Database.prototype.head = Database.prototype.exists;
Database.prototype.add = Database.prototype.create;

module.exports = Database;
