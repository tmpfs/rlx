module.exports = function security(info, req, next) {
  var scope = this, log = this.log;
  var verbose = this.verbose === true;
  var print = require('../util/print').bind(this);
  var opts = {db: this.database};
  var method = 'get';
  req.db().db.security()[method](opts, function(err, res, doc) {
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
