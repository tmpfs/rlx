module.exports = function log(info, req, next) {
  var scope = this, log = this.log;
  var verbose = this.verbose === true;
  var print = require('../util/print').bind(this);
  var offset = this.offset;
  var bytes = this.bytes;
  var opts = {qs: {}};
  if(this.offset) opts.qs.offset = this.offset;
  if(this.bytes) opts.qs.bytes = this.bytes;
  req.db().log(opts, function(err, res, doc) {
    req.db.add(req, err, res, opts, doc);
    req.text = true;
    if(err) return req.error(err, next, scope.server);
    print(doc, req, next);
  })
}
