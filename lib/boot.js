var path = require('path');
var os = require('os');
var cli = require('cli-command');
var fsutil = cli.fs;
var base = path.normalize(path.join(__dirname, '..'));
var lib = path.join(base, 'lib');

var login = require('./command/login');

var Couch = require('./util/couch')
  , CouchError = Couch.CouchError
var ValidationError = require('async-validate').error;
var ErrorDefinition = cli.error.ErrorDefinition;

var MAX_DB_CALL_STACK = 32;

function getErrorArguments(key, req, args, err) {
  //if(!req.db.calls || !req.db.calls.length) return args;
  var last;
  if(req.db.calls && req.db.calls.length) {
    last = req.db.calls[req.db.calls.length -1];
  }
  //console.dir(last);
  //console.log(key);
  //console.dir(err);
  //
  //
  function getCouchReason(err) {
    return (err.doc.reason || '').toLowerCase().replace(/\.$/, '');
  }
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
      //console.log('db %s', last.opts.db);
        args = [last.opts.db];
        break;
      case 'ENOT_FOUND':
        args = [last.opts.id || last.opts.db];
        break;
      case 'EBAD_REQUEST':
        args = [getCouchReason(err)];
        break;
      case 'ECONFLICT':
        args = [last.opts.db, last.opts.id, getCouchReason(err)];
        break;
      case 'EDELETED':
        args = [last.opts.db, last.opts.id];
        break;
      default:
        args = [typeof err.doc === 'string' ? err.doc : JSON.stringify(err.doc)];
    }
  }

  switch(key) {
    case 'EDATABASE':
      args = [this.options().database.toString(null)];
      break;
    case 'EID':
      args = [this.options().id.toString(null)];
      break;
  }

  return args;
}

module.exports = function boot(req, next) {
  var dbh;
  var home = fsutil.home();
  if(!home) {
    return next(this.errors.EHOME);
  }
  var rlx = path.join(home, '.rlx');
  req.dirs = req.dirs || {};
  req.dirs.home = home;
  req.dirs.rlx = rlx;
  req.dirs.tmp = os.tmpdir();
  req.dirs.base = base;
  req.dirs.lib = lib;
  req.dirs.tpl = {
    system: path.join(lib, 'template')
  }
  req.dirs.user = {
    template: path.join(rlx, 'template')
  }
  //this.log.debug('home %s', home);

  req.db = function(options) {
    if(!dbh || options) {
      options = options || {server: this.server};
      dbh = new Couch(options);
    }
    return dbh;
  }.bind(this);

  req.db.add = function(req, err, res, opts, doc) {
    var calls = req.db.calls = req.db.calls || [];
    calls.push({err: err, res: res, opts: opts, doc: doc});
    if(calls.length > MAX_DB_CALL_STACK) calls.shift();
  }.bind(this);

  req.auth = function(info, req, err, dbh) {
    if(err && err.status === 401) {
      if(this.username && this.password) {
        req.login.silent = true;
        login.call(this, info, req, function() {
          dbh.repeat();
        });
        return true;
      }else{
        this.log.warn('authentication required but no auth credentials');
      }
    }
    return false;
  }.bind(this);

  req.error = function(err, next) {
    var def = (err instanceof ErrorDefinition);
    var couch = (err instanceof CouchError);
    var ind = def ? 3 : 2;
    var args = [].slice.call(arguments, ind), key = def ? err.key : err.code;
    if(couch) key = err.getErrorKey();
    args = getErrorArguments.call(this, key, req, args, err);
    //console.dir(err);
    //console.log(key);
    //console.dir(args);
    if(def) {
      return next(err, args);
    }else if(couch) {
      if(this.errors[key]) {
        return next(this.errors[key], args);
      }else{
        return next(this.errors.EUNKNOWN_DB_ERROR, args);
      }
    }else if(err instanceof ValidationError) {
      return next(this.errors.EVALIDATE, [err.message]);
    }else if(err.code) {
      return next(this.errors[err.code], args);
    }
    next(err);
  }.bind(this);

  next();
}
