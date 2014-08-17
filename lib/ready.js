var fs = require('fs');
var path = require('path');
var url = require('url');
var request = require('request');

function resolve(file) {
  if(/^\//.test(file)) {
    return file;
  }
  return path.normalize(path.join(process.cwd(), file));
}

function load(file, noop, cb) {
  if(typeof noop === 'function') {
    cb = noop;
  }
  var u, wrap = this.wrap, errors = this.errors, body;
  try{u = url.parse(file);}catch(e){};
  if(u && u.protocol) {
    if(this.verbose) {
      this.log.info('GET %s', file);
    }
    request({url: file}, function(err, res, body) {
      if(err) return cb(err);
      if(!err && res.statusCode !== 200) {
        return cb(
          wrap(errors.EFILE_FETCH, [file, res.statusCode]));
      }
      if(noop) return cb(null, body);
      try {
        body = JSON.parse(body);
      }catch(e) {
        return cb(
          wrap(errors.EFILE_JSON_PARSE, [file, e.message.toLowerCase()]));
      }
      cb(null, body);
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

  var noops = ['lint'];
  var noop = req.result.unparsed.length
    && ~noops.indexOf(req.result.unparsed[0]);

  if(this.json) {
    req.document = {
      body: this.json
    };
    next();
  }else if(this.file) {
    load.call(this, this.file, noop, function(err, body) {
      if(err) return next(err);
      req.document = {
        body: body
      }
      next();
    });
  }else{
    next();
  }
}
