var url = require('url');
var request = require('request');

function load(file, cb) {
  var u, wrap = this.wrap, body;
  try{u = url.parse(file);}catch(e){};
  if(u && u.protocol) {
    if(this.verbose) {
      this.log.info('GET %s', file);
    }
    request({url: file}, function(err, res, body) {
      if(err) return cb(err);
      if(!err && res.statusCode !== 200) {
        return cb(
          wrap('remote file fetch from %s failed (%s)', [file, res.statusCode]));
      }
      try {
        body = JSON.parse(body);
      }catch(e) {
        return cb(
          wrap('json parse error in %s (%s)', [file, e.message.toLowerCase()]));
      }
      cb(null, body);
    })
  }else{
    try {
      body = require(file);
    }catch(e) {
      return cb(
        wrap('unable to require %s (%s)', [file, e.message.toLowerCase()]));
    }
    cb(null, body);
  }
}

module.exports = function ready(req, next) {
  if(this.file && this.json) {
    this.log.warn('option %s overrides %s', '--json', '--file');
  }
  if(this.json) {
    req.document = {
      body: this.json
    };
    next();
  }else if(this.file) {
    load.call(this, this.file, function(err, body) {
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
