var section = require('cdb').sections.admins;

module.exports = function ls(info, req, next) {
  var opts = {section: section};
  var dbh = req.db();
  dbh.config.get(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
