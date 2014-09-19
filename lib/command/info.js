module.exports = function info(info, req, next) {
  var opts = req.db.options(req);
  var dbh = req.db();
  //console.log('info called %j', opts);
  dbh.info(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
