var SECTION = require('./section');

var login = require('../login');

module.exports = function get(info, req, next) {
  var scope = this;
  var print = require('../../util/print').bind(this);
  var opts = {};
  opts.section = SECTION;
  if(info.args[0]) opts.key = info.args[0];
  var dbh = req.db();
  dbh.config.get(opts, function(err, res, doc) {
    if(err && err.status === 401 && scope.username && scope.password) {
      req.login.silent = true;
      login.call(scope, info, req, function() {
        dbh.repeat();
      });
      return;
    }
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
