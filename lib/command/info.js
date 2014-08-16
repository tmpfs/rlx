module.exports = function info(info, req, next) {
  var scope = this, log = this.log;
  var verbose = this.verbose === true;
  var print = require('../util/print').bind(this);
  req.db().info({path: '/'}, function(err, res, doc) {
    if(err) return req.error(err, next, scope.server);
    print(doc, req, next);
  })
}
