var prompt = require('../../prompt');
var get = require('./get');

module.exports = function set(info, req, next) {
  var scope = this;
  var opts = {};
  var user = req.login
    && req.login.credentials ? req.login.credentials.user : null;
  var pass = req.login
    && req.login.credentials ? req.login.credentials.pass : null;

  info = info || {args: []};
  opts.username = user || this.username;
  opts.password = pass || this.password;
  opts = req.db.options(req, opts);

  //console.dir(opts);

  var dbh = req.db();
  function send() {
    delete opts.db;
    delete opts.rev;
    delete opts.qs;
    //console.log('sending login request for %s %s', opts.username, opts.server);
    //console.dir(opts);
    dbh.session.set(opts, function(err, res, doc) {
      if(err) return req.error(err, req, next);
      console.log('setting authinfo on %s', res.statusCode);
      scope.configure().authinfo = {
        username: opts.username,
        response: doc
      }
      scope.authuser = opts.username;
      //console.log('%j', doc);
      //console.log('setting req auth %j', req.login.auth);
      //console.log('session set %s', req.login.silent);
      //if(req.login.silent) return req.complete();
      get.call(scope, info, req, next, function(err, res, doc) {
        if(err) return req.error(err, req, next);
        //req.login.doc = doc;
        scope.configure().authinfo.session = doc;
        if(!req.login.silent) {
          return req.print(doc, req, next);
        }

        next();
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
  }else if(this.interactive !== false && (!opts.username || !opts.password)){
    //console.log('asking in session/set %s', opts.username);
    //console.log('asking in session/set %s', this.username);
    //console.dir(req.login.credentials);
    //console.dir(info.args[0]);
    if(!opts.username && !opts.password) {
      return prompt.credentials.call(this, info, req, function(err, res) {
        opts.username = res.name;
        opts.password = res.pass;
        send();
      })
    }else if(opts.username) {
      //if(info.args[0]) this.username = info.args[0];
      return prompt.password.call(this, info, req, function(err, res) {
        opts.password = res.pass;
        send();
      })
    }
  }
  send();
}
