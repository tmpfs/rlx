var SECTION = require('./section');

module.exports = function set(info, req, next) {
  var print = require('../../util/print').bind(this);
  var opts = {};
  opts.section = SECTION;
  opts.key = this.username || info.args[0];
  opts.value = this.password || info.args[1];
  if(!opts.key) return next(this.errors.EUSERNAME_REQUIRED);
  if(!opts.value) return next(this.errors.EPASSWORD_REQUIRED);
  req.db().config.set(opts, function(err, res, doc) {
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
