var assert = require('assert');
var etag = require('./etag');
var types = require('./types');
var methods = require('./methods');
var keys = require('./keys');

/**
 *  Insert or update a document.
 */
function save(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, opts.db, opts.id]);
  assert(opts.body, 'body required to save document')
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json},
    qs: opts.qs,
    method: methods.put,
    body: this.getRequestBody(opts.body)
  };
  this.request(req, opts, opts.cb);
}

/**
 *  Get a document from a database.
 */
function get(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, opts.db, opts.id]);
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json},
    qs: opts.qs
  };
  this.request(req, opts, opts.cb);
}

/**
 *  Remove a document from a database.
 *
 *  If rev is not specified a HEAD request is performed
 *  to fetch the latest revision.
 */
function rm(opts, cb) {
  var scope = this;
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, opts.db, opts.id]);
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json},
    qs: opts.qs,
    method: methods.delete
  };
  if(opts.qs && opts.qs.rev) {
    this.request(req, opts, opts.cb);
  }else{
    head.call(this, opts, function(err, res, doc) {
      if(err) return cb(err, res);
      opts.qs = opts.qs || {};
      opts.qs.rev = doc.rev;
      rm.call(scope, opts, cb);
    })
  }
}

/**
 *  Head a document.
 */
function head(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, opts.db, opts.id]);
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json},
    method: methods.head
  };
  this.request(req, opts, function(err, res, doc) {
    if(err) return cb(err, res);
    var doc = {
      size: parseInt(res.headers['content-length']), rev: etag(res.headers)};
    cb(null, res, doc);
  });
}

module.exports = function DatabaseDocument(scope) {
  return {
    get: get.bind(scope),
    rm: rm.bind(scope),
    head: head.bind(scope),
    save: save.bind(scope)
  }
}
