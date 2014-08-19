var cli = require('cli-command');
var ErrorDefinition = cli.error.ErrorDefinition;
var ValidationError = require('async-validate').error;
var CouchError = require('cdb').CouchError;
var stringify = require('../util/stringify');

function getCouchReason(err) {
  return (err.doc.reason || '').toLowerCase().replace(/\.$/, '');
}

function getErrorArguments(key, req, args, err) {
  var dbh = req.db();
  var last = dbh.peek();
  //console.dir(Object.keys(dbh.peek()));
  //console.dir(last);
  //console.log(key);
  //console.dir(err);

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
        args = [typeof err.doc === 'string' ? err.doc : stringify(err.doc)];
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

function error(err, req, next) {
  //console.dir(req);
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
}

module.exports = error;
