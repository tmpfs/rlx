var SECTION = require('../../util/couch').sections.admins;

module.exports = function add(info, req, next) {
  var print = require('../../util/print').bind(this);
  var opts = {section: SECTION};
  opts.key = info.args[0];
  opts.value = info.args[1];
  if(!opts.key) return next(this.errors.EUSERNAME_REQUIRED);
  if(!opts.value) return next(this.errors.EPASSWORD_REQUIRED);
  var dbh = req.db();
  dbh.config.set(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    // TODO: print more meaningful output here
    print(doc, req, next);
  })
}
