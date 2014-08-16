module.exports = function exists(info, req, next) {
  var scope = this, log = this.log;
  var verbose = this.verbose === true;
  var print = require('../../util/print').bind(this);
  req.db().use(this.database).exists(function(err, res, doc) {
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
