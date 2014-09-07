var userdb = require('./userdb');
var qs = require('cdb').util;
var stringify = require('../../util/stringify');

module.exports = function ls(info, req, next) {
  //TODO: handle fetching authentication_db when necessary
  //TODO: allow POST to _all_docs
  var opts = req.db.options(req, {db: this.database || userdb.default});
  var q = qs.stringify({
    startkey: userdb.prefix
  }, stringify);
  opts.qs.startkey = q.startkey;

  var dbh = req.db();
  dbh.db.all(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
