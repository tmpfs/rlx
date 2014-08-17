module.exports = function add(info, req, next) {
  var print = require('../../util/print').bind(this);
  var opts = {db: this.database};
  req.db().db.add(opts, function(err, res, doc) {
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
