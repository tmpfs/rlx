var fs = require('fs');
var path = require('path');
var url = require('url');
var request = require('request');

var qsparser = require('./util/query');
var mime = require('./util/mime');
var types = require('./util/types');
var stringify = require('./util/stringify');

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

module.exports = function ready(req, next) {
  if(this.file && this.json) {
    this.log.warn('option %s overrides %s', '--json', '--file');
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
