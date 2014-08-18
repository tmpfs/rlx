module.exports = function exists(info, req, next) {
  var print = require('../../util/print').bind(this);
  var opts = {db: this.database};
  if(!opts.db) {
    return req.error(this.errors.EDATABASE, next);
  }
  var dbh = req.db();
  dbh.db.info(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    var code = res && res.statusCode ? res.statusCode : 500;
    if(code !== 200 && code !== 404) {
      doc = req.db().getErrorDocumentByStatusCode(code);
    }
    req.db.add(req, err, res, null, doc);
    if(err && code !== 200 && code !== 404) return req.error(err, next);
    doc = {ok: res.statusCode === 200};
    print(doc, req, next);
  })
}
