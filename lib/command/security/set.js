module.exports = function set(info, req, next) {
  var scope = this, log = this.log;
  var verbose = this.verbose === true;
  var print = require('../../util/print').bind(this);
  var opts = {db: this.database};
  if(req.document && req.document.body) {
    opts.body = req.document.body;
  }
  req.db().db.security().set(opts, function(err, res, doc) {
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
