var SECTION = require('./section');

module.exports = function get(info, req, next) {
  var print = require('../../util/print').bind(this);
  var opts = {};
  opts.section = SECTION;
  if(info.args[0]) opts.key = info.args[0];
  req.db().config().get(opts, function(err, res, doc) {
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
