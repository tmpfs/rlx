var util = require('util');

var AbstractCouch = require('./abstract');
var types = require('./types');
var methods = require('./methods');
var keys = require('./keys');

var Config = function(options) {
  AbstractCouch.apply(this, arguments);
}

util.inherits(Config, AbstractCouch);

/**
 *  Get a configuration object.
 */
Config.prototype.get = function(opts, cb) {
  opts = this.merge(opts, cb);
  var parts = [opts.server, keys.config];
  if(opts.section) parts.push(opts.section);
  if(opts.key) parts.push(opts.key);
  var u = this.url(parts);
  var req = {url: u, headers: {Accept: types.json}};
  this.request(req, opts, opts.cb, true);
}

/**
 *  Set a configuration value.
 */
Config.prototype.set = function(opts, cb) {
  opts = this.merge(opts, cb);
  var parts = [opts.server, keys.config];
  if(opts.section) parts.push(opts.section);
  if(opts.key) parts.push(opts.key);
  var u = this.url(parts);
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json},
    method: methods.put,
    body: JSON.stringify(opts.value)};
  this.request(req, opts, opts.cb, true);
}

/**
 *  Remove a configuration key.
 */
Config.prototype.rm = function(opts, cb) {
  opts = this.merge(opts, cb);
  var parts = [opts.server, keys.config];
  if(opts.section) parts.push(opts.section);
  if(opts.key) parts.push(opts.key);
  var u = this.url(parts);
  var req = {url: u, headers: {Accept: types.json}, method: methods.delete};
  this.request(req, opts, opts.cb, true);
}

module.exports = Config;
