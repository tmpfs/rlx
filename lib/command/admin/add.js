var prompt = require('../../prompt');
var section = require('cdb').sections.admins;
var get = require('./get');
var login = require('../login');

module.exports = function add(info, req, next) {
  var scope = this
    , conf = this.configure();

  if(!info.args.length) {
    return req.error(
      this.errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }

  var opts = req.db.options(req,
    {section: section, key: info.args[0], value: info.args[1]});
  if(!opts.key) {
    return req.error(this.errors.EUSERNAME_REQUIRED, req, next);
  }
  if(!opts.value && this.interactive === false) {
    return req.error(this.errors.EPASSWORD_REQUIRED, req, next);
  }

  var dbh = req.db();

  function send() {
    //console.dir(opts);
    //console.dir(scope.username);
    dbh.config.set(opts, function(err, res, doc) {
      if(err) return req.error(err, req, next);
      if(res && res.statusCode === 200 && !conf.authinfo) {
        scope.username = opts.key;
        scope.password = opts.value;
        req.login.silent = true;
        login.call(scope, info, req, function(err) {
          if(err) return req.error(err, req, next);
          get.call(scope, info, req, next);
        })
      }else{
        get.call(scope, info, req, next);
      }
    })
  }

  if(this.interactive !== false && !opts.value) {
    //this.username = opts.key;
    return prompt.newpass.call(this, info, req, function(err, res) {
      opts.value = res.pass;
      send();
    })
  }

  send();
}
