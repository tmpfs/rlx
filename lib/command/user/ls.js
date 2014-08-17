var userdb = require('./userdb');
var qs = require('../../util/couch').querystring;

module.exports = function ls(info, req, next) {
  var print = require('../../util/print').bind(this);
  var opts = {db: userdb.default};
  opts.qs = qs.stringify({
    startkey: userdb.prefix
  });
  req.db().db.all(opts, function(err, res, doc) {
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
