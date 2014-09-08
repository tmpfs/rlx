var cli = require('cli-command');
var ErrorDefinition = cli.error.ErrorDefinition;
var ValidationError = require('async-validate').error;
var CouchError = require('cdb').CouchError;
var stringify = require('../util/stringify');

function getCouchReason(err) {
  return (err.doc.reason || '').toLowerCase().replace(/\.$/, '');
}

function getErrorArguments(key, err, req, args, err) {
  var options = this.options();
  var dbh = req.db();
  var last = dbh.peek();

  //console.dir(key);

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
        args = [last.opts.db];
        break;
      case 'ENOT_FOUND':
        // TODO: handle HEAD where resource not found is indeterminate
        args = [last.opts.ddoc || last.opts.id || last.opts.db];
        break;
      case 'EFORBIDDEN':
      case 'EBAD_REQUEST':
        args = [getCouchReason(err)];
        break;
      case 'ECONFLICT':
        args = [last.opts.id, last.opts.db, getCouchReason(err)];
        break;
      case 'EDB_NOT_FOUND':
        args = [last.opts.db, getCouchReason(err)];
        break;
      case 'EQUERY_PARSE_ERROR':
      case 'EBAD_CONTENT_TYPE':
        args = [getCouchReason(err)];
        break;
      case 'EDELETED':
        args = [last.opts.db, last.opts.id];
        break;
      default:
        if(err.doc) {
          args = [typeof err.doc === 'string' ? err.doc : stringify(err.doc)];
        }
    }
  }

  switch(key) {
    case 'EFS_FILE_EXISTS':
      args = [this.output, options.force.toString(null)];
      break;
    case 'ENO_SUBCOMMAND':
      args = [req.command.name];
      break;
    case 'ESERVER_REQUIRED':
      args = [options.server.toString(null)];
      break;
    case 'EDATABASE_REQUIRED':
      args = [options.database.toString(null)];
      break;
    case 'EID_REQUIRED':
      args = [options.id.toString(null)];
      break;
    case 'EDDOC_REQUIRED':
      args = [options.ddoc.toString(null)];
      break;
    case 'ENAME_REQUIRED':
      args = [options.nm.toString(null)];
      break;
    case 'EATTACHMENT_REQUIRED':
      args = [options.attachment.toString(null)];
      break;
    case 'ETEMPLATE_REQUIRED':
      args = [options.template.toString(null)];
      break;
    case 'EDOCUMENT_REQUIRED':
      args = [
        options.file.toString(null),
        options.json.toString(null)];
      break;
    case 'EOUTPUT_DIRECTORY':
      args = err.parameters;
      break;
    case 'EOUTPUT_REQUIRED':
      args = [options.output.toString(null)];
      break;
    case 'EFILE_REQUIRED':
      args = [options.file.toString(null)];
      break;
    case 'EHEADER_PARSE':
      args = [req.headers.invalid];
      break;
    case 'EDESTINATION_REQUIRED':
      args = [options.destination.toString(null)];
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
    args = getErrorArguments.call(this, key, err, req, args, err);
  }
  if(couch) {
    if(this.errors[key]) {
      err = this.errors[key];
    }else{
      err = this.errors.EUNKNOWN_DB_ERROR;
    }
  }else if(err instanceof ValidationError) {
    args = [err.message];
    err = this.errors.EVALIDATE;
  }else if(!def && (err.code && this.errors[err.code])) {
    err = this.errors[err.code];
  }
  if(stop) {
    this.raise(this.wrap(err, args));
    // halt processing and fire complete
    err = true;
  }
  next(err, args);
}

module.exports = error;
