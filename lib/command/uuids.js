module.exports = function uuids(info, req, next) {
  var opts = req.db.options(req, {qs: {}});
  if(this.count) opts.qs.count = this.count;
  var dbh = req.db();
  dbh.uuids(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
