function load(file, cb) {
  // TODO: allow loading file from https? etc.
  // TODO: error handling
  cb(null, require(file));
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
      req.document = {
        body: body
      }
      next();
    });
  }else{
    next();
  }
}
