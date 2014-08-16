module.exports = function set(info, req, next) {
  var scope = this, log = this.log;
  var verbose = this.verbose === true;
  var print = require('../../util/print').bind(this);
  var opts = {};
  if(info.args[0]) opts.username = info.args[0];
  if(info.args[1]) opts.password = info.args[1];
  //if(!opts.section) return next(this.errors.ECONFIG_SECTION_REQUIRED);
  //if(!opts.key) return next(this.errors.ECONFIG_KEY_REQUIRED);
  req.db().session().set(opts, function(err, res, doc) {
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
