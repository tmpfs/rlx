var assert = require('assert');
var util = require('util');

var AbstractCouch = require('./abstract');
var types = require('./types');
var methods = require('./methods');
var keys = require('./keys');

var Database = function(options) {
  AbstractCouch.apply(this, arguments);
}

util.inherits(Database, AbstractCouch);

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

// PRIVATE
Database.prototype.merge = function(opts, cb) {
  var res = AbstractCouch.prototype.merge.apply(this, arguments);
  res.db = opts.db || this.options.db;
  assert(res.db, 'database name must be specified');
  return res;
}

// ALIAS
Database.prototype.head = Database.prototype.exists;

module.exports = Database;
