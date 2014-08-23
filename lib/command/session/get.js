module.exports = function get(info, req, next, cb) {
  var opts = req.db.options();
  req.db().session.get(opts, function(err, res, doc) {
    if(cb) return cb(err, res, doc);
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
