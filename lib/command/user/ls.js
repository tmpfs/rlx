var userdb = require('./userdb');
var qs = require('cdb').util;

module.exports = function ls(info, req, next) {
  var print = require('../../util/print').bind(this);
  //TODO: handle fetching authentication_db when necessary
  //TODO: allow POST to _all_docs
  var opts = {db: this.database || userdb.default};
  opts.qs = qs.stringify({
    startkey: userdb.prefix
  });
  var dbh = req.db();
  dbh.db.all(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, req, next);
    print(doc, req, next);
  })
}
