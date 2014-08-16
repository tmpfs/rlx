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
  opts = this.merge(opts, cb);
  var parts = [opts.server, keys.session];
  var u = this.url(parts);
  var req = {url: u, headers: {Accept: types.json}};
  this.request(req, opts, opts.cb);
}

/**
 *  Authenticate a session.
 */
Session.prototype.set = function(opts, cb) {
  opts = this.merge(opts, cb);
  var parts = [opts.server, keys.session];
  var u = this.url(parts);
  var body = {username: opts.username, password: opts.password};
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json},
    method: methods.post,
    body: JSON.stringify(body)
  };
  this.request(req, opts, opts.cb);
}

/**
 *  Delete a login session.
 */
Session.prototype.rm = function(opts, cb) {
  opts = this.merge(opts, cb);
  var parts = [opts.server, keys.session];
  var u = this.url(parts);
  var req = {url: u, headers: {Accept: types.json}, method: methods.delete};
  this.request(req, opts, opts.cb);
}

module.exports = Session;
