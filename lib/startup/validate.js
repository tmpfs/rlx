var async = require('async');
var fs = require('fs');
var path = require('path');
var cdb = require('cdb');

/**
 *  Determine if the server option is required for a command.
 *
 *  @param req The middleware request object.
 */
function server(req) {
  var exceptions = [
    this.commands().template,
    this.commands().help,
    this.commands().lint,
    this.commands().edit];
  var cmd = req.result.unparsed[0], i, names;
  // let the empty logic handle this
  if(!cmd) return true;
  for(i = 0;i < exceptions.length;i++) {
    names = exceptions[i].names();
    if(~names.indexOf(cmd)) {
      return true;
    }
  }
  return false;
}

/**
 *  Validate the parent directory of an output file exists
 *  and is a directory.
 */
function output(req, cb) {
  var scope = this, output = this.output;
  var dir = path.dirname(output);
  fs.stat(dir, function(err, stats) {
    if(err || (!err && stats && !stats.isDirectory())) {
      err = scope.errors.EOUTPUT_DIRECTORY;
      err.parameters = [dir];
      err.source = err;
      return cb(err);
    }else{
      req.output.parent = stats;
      fs.exists(output, function(exists) {
        req.output.exists = exists;
        cb();
      });
    }
  })
}

/**
 *  Collate header options into an object and
 *  decorate the req with a headers property.
 */
function headers(req, cb) {
  var disallowed = ['content-type', 'accept'];
  var re = /^([^:]+):(.+)$/, i, h, k, v;
  for(i = 0;i < this.header.length;i++) {
    h = this.header[i];
    if(!re.test(h)) {
      req.headers.invalid = h;
      return cb(this.errors.EHEADER_PARSE);
    }
    k = h.replace(re, '$1').trim();
    v = h.replace(re, '$2').trim();
    if(!k || !v) {
      req.headers.invalid = h;
      return cb(this.errors.EHEADER_PARSE);
    }
    if(~disallowed.indexOf(k.toLowerCase())) {
      this.log.warn('header %s is not allowed, it will be ignored', k);
    }else{
      req.headers[k] = v;
    }
    //console.log('parse header...%s', h);
    //console.log('parse header...%s', k);
    //console.log('parse header...%s', v);
  }
  cb();
}

/**
 *  Additional validation that occurs when the application is ready.
 *
 *  @param req The middleware request object.
 *  @param next The callback function.
 */
function startup(req, next) {
  var scope = this;
  // non-async validation routines
  if(!this.server && !server.call(this, req)) {
    return req.error(this.errors.ESERVER_REQUIRED, req, next, null, true);
  }else if(this.database && !cdb.util.db.valid(this.database)) {
    return req.error(
      this.errors.EILLEGAL_DATABASE_NAME, req, next, [this.database], true);
  }

  var routines = [];

  if(this.output) {
    routines.push(output);
  }

  if(this.header.length) {
    routines.push(headers);
  }

  if(routines.length) {
    async.eachSeries(routines, function(item, callback) {
      item.call(scope, req, callback);
    }, function(err) {
      next(err);
    })
  }else{
    next();
  }
}

module.exports = startup;
