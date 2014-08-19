module.exports = function log(info, req, next) {
  var print = require('../util/print').bind(this);
  var offset = this.offset;
  var bytes = this.bytes;
  var opts = {qs: {}};
  if(this.offset) opts.qs.offset = this.offset;
  if(this.bytes) opts.qs.bytes = this.bytes;
  var dbh = req.db();
  dbh.log(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    req.db.add(req, err, res, opts, doc);
    req.text = true;
    if(err) return req.error(err, req, next);
    print(doc, req, next);
  })
}
