module.exports = function tasks(info, req, next) {
  var scope = this, log = this.log;
  var verbose = this.verbose === true;
  var print = require('../util/print').bind(this);
  req.db().log(function(err, res, doc) {
    req.text = true;
    if(err) return req.error(err, next, scope.server);
    print(doc, req, next);
  })
}
