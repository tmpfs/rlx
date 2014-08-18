var types = require('./types');
var methods = require('./methods');
var keys = require('./keys');

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
 */
function rm(opts, cb) {
  opts = this.merge(opts, cb);
  var u = this.url([opts.server, opts.db, opts.id]);
  var req = {
    url: u,
    headers: {Accept: types.json, 'Content-Type': types.json},
    qs: opts.qs,
    method: methods.delete
  };
  this.request(req, opts, opts.cb);
}


module.exports = function DatabaseDocument(scope) {
  return {
    get: get.bind(scope),
    rm: rm.bind(scope)
  }
}
