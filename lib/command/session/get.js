module.exports = function get(info, req, next, cb) {
  var server = this.server;
  var opts = req.db.options(req);
  req.db().session.get(opts, function(err, res, doc) {
    if(cb) return cb(err, res, doc);
    if(err) return req.error(err, req, next);
    if(doc) {
      doc.server = server;
    }
    req.print(doc, req, next);
  })
}
