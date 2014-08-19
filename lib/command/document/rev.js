var qs = require('cdb').querystring;

module.exports = function rev(info, req, next) {
  var print = require('../../util/print').bind(this);
  var opts = {db: this.database, id: this.id};
  if(!opts.db) {
    return req.error(this.errors.EDATABASE, next);
  }
  if(!opts.id) {
    return req.error(this.errors.EID, next);
  }
  var dbh = req.db();
  req.db().db.doc.head(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, req, next);
    print(doc, req, next);
  })
}
