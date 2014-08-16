var SECTION = require('./section');

module.exports = function get(info, req, next) {
  var scope = this, log = this.log;
  var verbose = this.verbose === true;
  var print = require('../../util/print').bind(this);
  var opts = {};
  opts.section = SECTION;
  if(info.args[0]) opts.key = info.args[0];
  req.db().config().get(opts, function(err, res, doc) {
    // TODO: convert EUNKNOWN_CONFIG_VALUE
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
