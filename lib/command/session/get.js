module.exports = function get(info, req, next) {
  var opts = {};
  req.db().session.get(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
