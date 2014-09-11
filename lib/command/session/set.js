var prompt = require('../../prompt');
var get = require('./get');

module.exports = function set(info, req, next) {
  var scope = this;
  var opts = {};
  var user = req.login
    && req.login.credentials ? req.login.credentials.user : null;
  var pass = req.login
    && req.login.credentials ? req.login.credentials.pass : null;
  opts.username = user || this.username || info.args[0];
  opts.password = pass || this.password;
  //console.dir(opts);
  opts = req.db.options(req, opts);

  var dbh = req.db();
  function send() {
    dbh.session.set(opts, function(err, res, doc) {
      if(err) return req.error(err, req, next);
      scope.configure().authinfo = {
        username: opts.username,
        response: doc
      }
      //console.log('setting req auth %j', req.login.auth);
      //console.log('session set %s', req.login.silent);
      if(req.login.silent) return next();
      get.call(scope, info, req, next, function(err, res, doc) {
        if(err) return req.error(err, req, next);
        //req.login.doc = doc;
        scope.configure().authinfo.session = doc;
        req.print(doc, req, next);
      });
    })
  }

  // non-interactive, everything is required
  if(this.interactive === false) {
    if(!opts.username) {
      return req.error(this.errors.EUSERNAME_REQUIRED, req, next);
    }else if(!opts.password) {
      return req.error(this.errors.EPASSWORD_REQUIRED, req, next);
    }

  // prompt for credentials
  }else if(this.interactive !== false){
    if(!opts.username && !opts.password) {
      return prompt.credentials.call(this, info, req, function(err, res) {
        opts.username = res.name;
        opts.password = res.pass;
        send();
      })
    }else if(this.username || info.args[0]) {
      return prompt.password.call(this, info, req, function(err, res) {
        opts.password = res.pass;
        send();
      })
    }
  }
  send();
}
