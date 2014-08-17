module.exports = function log(info, req, next) {
  var print = require('../util/print').bind(this);
  var offset = this.offset;
  var bytes = this.bytes;
  var opts = {qs: {}};
  if(this.offset) opts.qs.offset = this.offset;
  if(this.bytes) opts.qs.bytes = this.bytes;
  req.db().log(opts, function(err, res, doc) {
    req.db.add(req, err, res, opts, doc);
    req.text = true;
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
