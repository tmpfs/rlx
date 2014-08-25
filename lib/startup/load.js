var fs = require('fs');
var url = require('url');
var request = require('request');
var cdb = require('cdb');

var qsparser = require('../util/query');
var mime = require('../util/mime');
var types = require('../util/types');
var stringify = require('../util/stringify');
var resolve = require('../util/resolve');

function load(req, file, noop, cb) {
  var log = this.log;
  if(typeof noop === 'function') {
    cb = noop;
  }
  var u, wrap = this.wrap, errors = this.errors, body, type;
  try{u = url.parse(file);}catch(e){};
  if(req.stdin) {
    var doc;
    try {
      doc = JSON.parse(req.stdin);
    }catch(e) {
      return cb(
        this.errors.ESTDIN_JSON_PARSE, req.stdin, null, types.JSON, false);
    }
    cb(null, doc, null, types.JSON, false);
  }else if(u && u.protocol) {
    if(this.verbose) {
      this.log.info('GET %s', file);
    }
    // TODO: integrate with the HTTP logger
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
 *  Parses query string arguments and loads a
 *  file (--file, --json or stdin).
 */
function init(req, next) {
  var scope = this;
  qsparser.call(scope, req, function(err) {
    if(err) return req.error(err, req, next);
    var file = this.file;
    if(!file && !req.result.stdin && !this.json) return next();
    var cmd = req.result.unparsed[0];
    var ignore = ['att', 'attach'];
    if(cmd && ~ignore.indexOf(cmd)) {
      return next();
    }
    var noops = ['lint'];
    var noop = cmd && ~noops.indexOf(cmd);
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
          source: req.result.stdin ? 0 : file,
          body: body,
          type: type,
          remote: remote,
          literal: false
        }
        //console.dir(req.document);
        if(res) {
          req.document.res = {
            status: res.statusCode,
            headers: res.headers
          }
        }
        next();
      });
    }
  });
}

module.exports = init;
