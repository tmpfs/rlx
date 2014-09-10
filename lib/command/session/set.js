var prompt = require('../../prompt');
var get = require('./get');

module.exports = function set(info, req, next) {
  var scope = this;
  var opts = {};
  opts.username = this.username || info.args[0];
  opts.password = this.password;
  opts = req.db.options(req, opts);
  var dbh = req.db();
  function send() {
    dbh.session.set(opts, function(err, res, doc) {
      if(err) return req.error(err, req, next);
      req.login.auth = {
        username: opts.username,
        res: res,
        doc: doc
      }
      //console.log('session set %s', req.login.silent);
      if(req.login.silent) return next();
      get.call(scope, info, req, next, function(err, res, doc) {
        if(err) return req.error(err, req, next);
        req.login.doc = doc;
        req.print(doc, req, next);
      });
    })
  }
  if(!opts.username) return req.error(this.errors.EUSERNAME_REQUIRED, req, next);
  if(!opts.password) {
    if(this.interactive !== false) {
      return prompt.password.call(this, info, req, function(err, res) {
        opts.password = res.pass;
        send();
      })
    }else{
      return req.error(this.errors.EPASSWORD_REQUIRED, req, next);
    }
  }
  send();
}
