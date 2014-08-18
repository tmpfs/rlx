var qs = require('../../util/couch').querystring;

module.exports = function rev(info, req, next) {
  var print = require('../../util/print').bind(this);
  var id = this.id;
  var opts = {db: this.database};
  if(!id) {
    return next(this.errors.EID_OPTION);
  }
  opts.id = id;
  var dbh = req.db();
  req.db().db.doc.head(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
