var util = require('util');

var AbstractCouch = require('./abstract');

var types = require('./types');
var methods = require('./methods');
var keys = require('./keys');

var Session = function(options) {
  AbstractCouch.apply(this, arguments);
}

util.inherits(Session, AbstractCouch);

/**
 *  Get the current session.
 */
Session.prototype.get = function(opts, cb) {
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
}

/**
 *  Authenticate a session.
 */
Session.prototype.set = function(opts, cb) {
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
}

/**
 *  Delete a login session.
 */
Session.prototype.rm = function(opts, cb) {
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
}

module.exports = Session;
