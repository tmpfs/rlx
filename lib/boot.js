var path = require('path');
var os = require('os');
var fsutil = require('cli-command').fs;

var Couch = require('./util/couch')
  , CouchError = Couch.CouchError

var MAX_DB_CALL_STACK = 32;

function getErrorArguments(key, req, args) {
  var last = req.db.calls[req.db.calls.length -1];
  //console.dir(last);
  //console.log(key);
  if(last) {
    switch(key) {
      case 'EMETHOD_NOT_ALLOWED':
        args = [last.err.res.req.method];
        break;
      case 'EUNKNOWN_CONFIG_VALUE':
        args = [last.opts.section, last.opts.key];
        break;
      case 'ECONNREFUSED':
        args = [this.server];
        break;
      case 'ENO_DB_FILE':
      case 'EILLEGAL_DATABASE_NAME':
      case 'EFILE_EXISTS':
      case 'EMISSING':
        args = [last.opts.db];
        break;
      default:
        args = [last.doc];
    }
  }
  return args;
}

module.exports = function boot(req, next) {
  var home = fsutil.home();
  if(!home) {
    return next(this.errors.EHOME);
  }
  var rlx = path.join(home, '.rlx');
  req.dirs = req.dirs || {};
  req.dirs.home = home;
  req.dirs.rlx = rlx;
  req.dirs.tmp = os.tmpdir();
  //this.log.debug('home %s', home);

  req.db = function(options) {
    options = options || {server: this.server};
    return new Couch(options);
  }.bind(this);

  req.db.add = function(req, err, res, opts, doc) {
    var calls = req.db.calls = req.db.calls || [];
    calls.push({err: err, res: res, opts: opts, doc: doc});
    if(calls.length > MAX_DB_CALL_STACK) calls.shift();
  }.bind(this);

  req.error = function(err, next) {
    var args = [].slice.call(arguments, 2), key = err.code;
    args = getErrorArguments.call(this, key, req, args);
    if(err instanceof CouchError) {
      key = err.getErrorKey();
      args = getErrorArguments.call(this, key, req, args);
      //console.log('got couch error %s', key);
      if(this.errors[key]) {
        return next(this.errors[key], args);
      }else{
        return next(this.errors.EUNKNOWN_DB_ERROR, args);
      }
    }else if(err.code) {
      return next(this.errors[err.code], args);
    }
    next(err);
  }.bind(this);

  next();
}
