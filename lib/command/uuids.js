module.exports = function uuids(info, req, next) {
  var opts = {qs: {}};
  if(this.count) opts.qs.count = this.count;
  var dbh = req.db();
  dbh.uuids(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
