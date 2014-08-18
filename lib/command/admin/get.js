var SECTION = require('./section');

var login = require('../login');

module.exports = function get(info, req, next) {
  var scope = this;
  var print = require('../../util/print').bind(this);
  var opts = {};
  opts.section = SECTION;
  if(info.args[0]) opts.key = info.args[0];
  req.db().config.get(opts, function(err, res, doc) {
    if(err && err.status === 401 && scope.username && scope.password) {
      //console.log('got unauth error');
      login.call(scope, info, req, function() {
        console.log('got login response, repeat last request');
        //console.dir(arguments);
        next();
      });
      return;
    }
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
