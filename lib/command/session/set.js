var get = require('./get');

module.exports = function set(info, req, next) {
  var scope = this;
  var opts = {};
  opts.username = this.username || info.args[0];
  opts.password = this.password || info.args[1];
  opts = req.db.options(req, opts);
  if(!opts.username) return req.error(this.errors.EUSERNAME_REQUIRED, req, next);
  if(!opts.password) return req.error(this.errors.EPASSWORD_REQUIRED, req, next);
  req.db().session.set(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.login.auth = {
      username: opts.username,
      res: res,
      doc: doc
    }
    //console.log('session set %s', req.login.silent);
    //console.log('after %j' ,doc);
    if(req.login.silent) return next();
    //console.log('print doc');
    //req.print(doc, req, next);
    get.call(scope, info, req, next, function(err, res, doc) {
      if(err) return req.error(err, req, next);
      req.login.doc = doc;
      //console.dir(req.login);
      req.print(doc, req, next);
    });
  })
}
