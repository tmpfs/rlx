var userdb = require('./userdb');
var qs = require('../../util/couch').querystring;

module.exports = function get(info, req, next) {
  var print = require('../../util/print').bind(this);
  var id = this.id;
  var rev = this.rev;
  var opts = {db: this.database || userdb.default};
  if(!id) {
    return next(this.errors.EID_OPTION);
  }
  id = userdb.id(id);
  opts.id = id;
  if(rev) {
    opts.qs = qs.stringify({
      rev: rev
    });
  }
  req.db().db.doc.get(opts, function(err, res, doc) {
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
