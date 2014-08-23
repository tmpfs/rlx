var fs = require('fs');
var path = require('path');
var url = require('url');
var request = require('request');
var logger = require('cli-logger');

var qsparser = require('./util/query');
var mime = require('./util/mime');
var types = require('./util/types');
var stringify = require('./util/stringify');
var cdb = require('cdb');

function resolve(file) {
  if(/^\//.test(file)) {
    return file;
  }
  return path.normalize(path.join(process.cwd(), file));
}

function load(req, file, noop, cb) {
  var log = this.log;
  if(typeof noop === 'function') {
    cb = noop;
  }
  var u, wrap = this.wrap, errors = this.errors, body, type;
  try{u = url.parse(file);}catch(e){};
  if(req.stdin) {
    //console.dir(req.stdin.length);
    //console.log('std input %s', req.stdin);
    console.log('TODO: handle stdin json %s', req.stdin);
    cb();
  }else if(u && u.protocol) {
    if(this.verbose) {
      this.log.info('GET %s', file);
    }
    var headers = {Accept: [mime.JSON, mime.JAVASCRIPT, mime.TEXT].join(', ')};
    request({url: file, headers: headers}, function(err, res, body) {
      if(err) return cb(err);
      if(!err && res.statusCode !== 200) {
        return cb(
          wrap(errors.EFILE_FETCH, [file, res.statusCode]));
      }
      var ct = res.headers['content-type'];
      type = ct;
      if(!~mime.list.indexOf(ct)) {
        log.warn('unsupported content type %s', ct);
      }else{
        if(type === mime.json) {
          type = types.JSON;
        }else if(type === mime.text) {
          type = types.TEXT;
        }else if(~mime.javascript.indexOf(ct)) {
          type = types.JS;
        }
      }
      if(noop) return cb(null, body, res, type, true);
      try {
        body = JSON.parse(body);
      }catch(e) {
        return cb(
          wrap(errors.EFILE_JSON_PARSE, [file, e.message.toLowerCase()]));
      }
      cb(null, body, res, type, true);
    })
  }else{
    // default detection on file extension
    type = types.getByExtension(file);
    file = resolve(file);

    // TODO: do not require here as we do not want to validate
    // TODO: contents at this stage, lint can do that
    if(!noop) {
      try {
        body = require(file);
      }catch(e) {
        return cb(
          wrap(errors.EFILE_REQUIRE, [file, e.message.toLowerCase()]));
      }
      cb(null, body, null, type, false);
    }else{
      fs.readFile(file, function(err, data) {
        if(err) return cb(err);
        cb(null, '' + data, null, type, false);
      })
    }
  }
}

/**
 *  Determine if the server value is set.
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

//process.once('exit', function(){console.log('got exit' + new Error().stack)})

module.exports = function ready(req, next) {

  var scope = this;

  var levels = logger.keys, lvl, i;
  for(var i = 0;i < levels.length;i++) {
    if(this['log' + levels[i]] === true) {
      this.log.level(logger.levels[levels[i]]);
      break;
    }
  }

  if(!this.server && !server.call(this, req)) {
    return req.error(this.errors.ESERVER_REQUIRED, req, next, null, true);
  }else if(this.database && !cdb.util.db.valid(this.database)) {
    return req.error(
      this.errors.EILLEGAL_DATABASE_NAME, req, next, [this.database], true);
  }

  req.document = {};
  req.login = req.login || {};

  /**
   *  Parses query string arguments and loads a file (--file or --json).
   */
  function file() {
    qsparser.call(scope, req, function() {
      if(arguments[0]) return req.error(arguments[0], req, next);
      var file = this.file;
      var noops = ['lint'];
      var noop = req.result.unparsed.length
        && ~noops.indexOf(req.result.unparsed[0]);
      if(this.json && !req.result.stdin) {
        if(noop) this.json = stringify(this.json);
        req.document = {
          body: this.json,
          type: types.JSON,
          source: 'json',
          remote: false,
          literal: true
        };
        next();
      }else if(file || req.result.stdin) {
        load.call(this, req, file, noop, function(err, body, res, type, remote) {
          if(err) return next(err);
          req.document = {
            source: file,
            body: body,
            type: type,
            remote: remote,
            literal: false
          }
          if(res) {
            req.document.res = {
              status: res.statusCode,
              headers: res.headers
            }
          }
          next();
        });
      }else{
        next();
      }
    });
  }

  function authenticate() {
    req.auth.call(this, null, req, null, function() {
      file.call(scope);
    });
  }

  if(req.hasCredentials() && req.result.unparsed[0] !== 'login') {
    authenticate.call(this);
  }else{
    file.call(this);
  }
}
