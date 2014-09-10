var prompt = require('../../prompt');
var section = require('cdb').sections.admins;
var get = require('./get');

module.exports = function add(info, req, next) {
  var scope = this;
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
    dbh.config.set(opts, function(err, res, doc) {
      if(err) return req.error(err, req, next);
      scope.username = opts.key;
      scope.password = opts.value;
      get.call(scope, info, req, next);
    })
  }

  if(this.interactive !== false && !info.args[1]) {
    return prompt.newpass.call(this, info, req, function(err, res) {
      opts.value = res.pass;
      send();
    })
  }

  send();
}
