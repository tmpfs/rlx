var async = require('async')
  , fs = require('fs')
  , path = require('path')
  , url = require('url')
  , cdb = require('cdb')
  , resolve = require('../util/resolve')
  , direxists = require('../util/direxists');

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
        if(!exists) return cb();
        fs.stat(output, function(err, stats) {
          req.output.stat = stats;
          cb();
        })
      });
    }
  })
}

/**
 *  Check search path directories exist.
 */
function searchPath(req, cb) {
  var scope = this, errors = this.errors;
  async.concat(this.searchPath, function(pth, callback) {
    direxists.call(scope, pth, function(err, dir, stat) {
      if(err) return cb(err);
      callback(null, dir);
    })
  }, function(err, result) {
    cb(err, {key: 'searchPath', value: result});
  })
}

/**
 *  Collate header options into an object and
 *  decorate the req with a headers property.
 */
function headers(req, cb) {
  var disallowed = ['content-type', 'accept'];

  // raw HTTP requests allow any header
  var tt = this.commands().http;
  var unparsed = req.unparsed;
  if(unparsed && unparsed.length && ~tt.names().indexOf(unparsed[0])) {
    disallowed = [];
  }

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

function server(req) {
  var whitelist = [
    this.commands().admin,
    this.commands().application,
    this.commands().attach,
    this.commands().bulk.commands().pull,
    this.commands().bulk.commands().push,
    this.commands().bulk.commands().revs,
    this.commands().bulk.commands().rm,
    this.commands().config,
    this.commands().database,
    this.commands().document,
    this.commands().level,
    this.commands().local,
    this.commands().replicate,
    this.commands().security,
    this.commands().session,
    this.commands().user,
    this.commands().info,
    this.commands().log,
    this.commands().login,
    this.commands().logout,
    this.commands().restart,
    this.commands().stats,
    this.commands().tasks,
    this.commands().uuids,
    this.commands().whoami,
  ];

  var unparsed = req.result.unparsed;
  var cmd = unparsed[0], c, p, t, s;

  //console.log('validate server on %s', cmd);

  // let the empty logic handle this
  if(!cmd) return false;

  for(var i = 0;i < whitelist.length;i++) {
    c = whitelist[i];

    // some commands are dynamically deleted
    if(!c) continue;

    p = c.getParents();

    // interactive command has been deleted so need to remove parent
    if(c.parent() && c.parent().key() === 'interactive') {
      p.shift();
    }

    //console.log('test %s', c.key(), p.length);

    // top-level command match
    if(p.length === 1) {
      //console.log('testing command for server required %s', c.key());

      if(~c.names().indexOf(cmd)) {
        return true;
      }
    }else{
      t = c.parent().names();
      if(~t.indexOf(cmd) && ~c.names().indexOf(unparsed[1])) {
        return true;
      }
    }
  }

  return false;
}

/**
 *  Determine if a destination (--destination) for a copy
 *  operation is absolute. Copy operations are not permitted
 *  across databases so the URL should always be relative.
 */
function destination(req) {
  var u = url.parse(this.destination);
  if(u.protocol) return false;
  return true;
}

/**
 *  Additional validation that occurs when the application is ready.
 *
 *  @param req The middleware request object.
 *  @param next The callback function.
 */
function startup(req, next) {
  var scope = this;

  //console.log('STARTUP VALIDATION %s', this.server);

  // non-async validation routines
  if(!this.server && server.call(this, req)) {
    return next(this.errors.ESERVER_REQUIRED);
  }

  if(this.destination && !destination.call(this, req)) {
    return next(
      this.wrap(this.errors.EINVALID_DESTINATION, [this.destination]));
  }

  // async validation
  var routines = [];

  if(this.output) {
    routines.push(output);
  }

  if(this.searchPath && this.searchPath.length) {
    routines.push(searchPath);
  }

  if(this.header.length) {
    routines.push(headers);
  }

  if(routines.length) {
    async.eachSeries(routines, function(item, callback) {
      item.call(scope, req, function(err, result) {
        if(err) return callback(err);
        if(result && result.key && result.value) {
          scope[result.key] = result.value;
        }
        callback();
      });
    }, function(err) {
      if(err) return next(err);
      next();
    })
  }else{
    next();
  }
}

module.exports = startup;
