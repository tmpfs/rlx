var SECTION = require('../../util/couch').sections.admins;

module.exports = function ls(info, req, next) {
  var scope = this;
  var print = require('../../util/print').bind(this);
  var opts = {section: SECTION};
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
