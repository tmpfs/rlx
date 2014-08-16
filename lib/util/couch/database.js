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
 *  Get a configuration object.
 */
Database.prototype.get = function(opts, cb) {
}

/**
 *  Set a configuration value.
 */
Database.prototype.set = function(opts, cb) {
}

/**
 *  Remove a configuration key.
 */
Database.prototype.rm = function(opts, cb) {
}

module.exports = Database;
