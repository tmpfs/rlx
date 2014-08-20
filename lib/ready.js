var fs = require('fs');
var path = require('path');
var url = require('url');
var request = require('request');

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

function load(file, noop, cb) {
  var log = this.log;
  if(typeof noop === 'function') {
    cb = noop;
  }
  var u, wrap = this.wrap, errors = this.errors, body;
  try{u = url.parse(file);}catch(e){};
  if(u && u.protocol) {
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
      if(!~mime.list.indexOf(ct)) {
        log.warn('unsupported content type %s', ct);
      }
      if(noop) return cb(null, body, res);
      try {
        body = JSON.parse(body);
      }catch(e) {
        return cb(
          wrap(errors.EFILE_JSON_PARSE, [file, e.message.toLowerCase()]));
      }
      cb(null, body, res);
    })
  }else{
    file = resolve(file);
    if(!noop) {
      try {
        body = require(file);
      }catch(e) {
        return cb(
          wrap(errors.EFILE_REQUIRE, [file, e.message.toLowerCase()]));
      }
      cb(null, body);
    }else{
      fs.readFile(file, function(err, data) {
        if(err) return cb(err);
        cb(null, '' + data);
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

module.exports = function ready(req, next) {
  if(this.file && this.json) {
    this.log.warn('option %s overrides %s', '--json', '--file');
  }
  if(this.database && !cdb.util.db.valid(this.database)) {
    return req.error(
      this.errors.EILLEGAL_DATABASE_NAME, req, next, [this.database], true);
  }

  if(!this.server) {
    if(!server.call(this, req)) {
      return req.error(this.errors.ESERVER_REQUIRED, req, next, null, true);
    }
  }

  qsparser.call(this, req, function() {
    if(arguments[0]) return req.error(arguments[0], req);
    req.login = req.login || {};
    var noops = ['lint'];
    var noop = req.result.unparsed.length
      && ~noops.indexOf(req.result.unparsed[0]);
    if(this.json) {
      if(noop) this.json = stringify(this.json);
      req.document = {
        body: this.json,
        type: types.JSON
      };
      next();
    }else if(this.file) {
      load.call(this, this.file, noop, function(err, body, res) {
        if(err) return next(err);
        req.document = {
          body: body
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
