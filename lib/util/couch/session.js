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
  var scope = this;
  opts = this.merge(opts, cb);
  var parts = [opts.server, keys.session];
  var u = this.url(parts);
  var body = {name: opts.username, password: opts.password};
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json},
    method: methods.post,
    body: JSON.stringify(body)
  };
  // NOTE: we never specify caller and name
  // NOTE: so this request does not get pushed
  // NOTE: on the db call stack
  this.request(req, opts, function(err, res, doc) {
    //console.log('status %s', res.statusCode);
    //console.log('res headers %j', res.headers);
    var cookie = res.headers['set-cookie'];
    if(res.statusCode === 200 && cookie) {
      var key = scope.getServerKey(req.url);
      scope.auth.user[key] = opts.username;
      scope.auth.cookie = scope.auth.cookie || {};
      scope.auth.cookie[key] = scope.auth.cookie[key] || {};
      scope.auth.cookie[key][opts.username] =
        Array.isArray(cookie) ? cookie[0] : cookie;
    }
    cb(err, res, cb);
  });
}

/**
 *  Delete a login session.
 */
Session.prototype.rm = function(opts, cb) {
  opts = this.merge(opts, cb);
  var parts = [opts.server, keys.session];
  var u = this.url(parts);
  var req = {url: u, headers: {Accept: types.json}, method: methods.delete};
  if(this.auth.cookie) {
    var key = this.getServerKey(req.url);
    var user = this.auth.user[key];
    if(user && this.auth.cookie[key]) {
      delete this.auth.cookie[key][user];
    }else{
      delete this.auth.cookie[key];
    }
  }
  this.request(req, opts, opts.cb);
}

module.exports = Session;
