var linter = require('../util/lint');

module.exports = function lint(info, req, next) {
  var print = require('../util/print').bind(this);
  if(!this.file || !req.document || !req.document.body) {
    return next(this.errors.EFILE_OPTION);
  }
  var method, opts;
  if(/\.json$/.test(this.file)) {
    method = linter.json;
    opts = req.document.body;
  }else if(/\.js$/.test(this.file)) {
    method = linter.js;
    opts = {file: this.file, body: req.document.body}
  }
  method(opts, function(err, doc) {
    if(err) return next(Array.isArray(err) ? err[0] : err);
    next();
  });
}
