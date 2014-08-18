module.exports = function get(info, req, next) {
  var print = require('../../util/print').bind(this);
  var opts = {};
  if(info.args[0]) opts.section = info.args[0];
  if(info.args[1]) opts.key = info.args[1];
  var dbh = req.db();
  dbh.config.get(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
