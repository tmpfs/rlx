module.exports = function get(info, req, next) {
  var scope = this, log = this.log;
  var verbose = this.verbose === true;
  var print = require('../../util/print').bind(this);
  var opts = {};
  if(info.args[0]) opts.section = info.args[0];
  if(info.args[1]) opts.key = info.args[1];
  req.db().config().get(opts, function(err, res, doc) {
    if(err) return req.error(err, next, scope.server);
    print(doc, req, next);
  })
}
