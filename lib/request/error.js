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
  //
  //console.dir(req);

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
        //console.log('db %j', last.doc);
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
    case 'EFS_FILE_EXISTS':
      args = [this.output, this.options().force.toString(null)];
      break;
    case 'ENO_SUBCOMMAND':
      args = [req.command.name];
      break;
    case 'EDATABASE_REQUIRED':
      args = [this.options().database.toString(null)];
      break;
    case 'EID':
      args = [this.options().id.toString(null)];
      break;
  }

  return args;
}

function error(err, req, next, parameters, stop) {
  var def = (err instanceof ErrorDefinition);
  var couch = (err instanceof CouchError);
  var args = Array.isArray(parameters)
    ? parameters : [].slice.call(arguments, 3);
  var key = def ? err.key : err.code;
  if(couch) key = err.getErrorKey();
  if(!Array.isArray(parameters)) {
    args = getErrorArguments.call(this, key, req, args, err);
  }
  if(couch) {
    if(this.errors[key]) {
      err = this.errors[key];
    }else{
      err = this.errors.EUNKNOWN_DB_ERROR;
    }
  }else if(err instanceof ValidationError) {
    err = this.errors.EVALIDATE;
    args = [err.message];
  }else if(!def && err.code && this.errors[err.code]) {
    err = this.errors[err.code];
  }
  if(stop) {
    this.raise(this.wrap(err), args);
    // halt processing and fire complete
    err = true;
  }
  next(err, args);
}

module.exports = error;
