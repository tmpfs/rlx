var linter = require('../util/lint');

module.exports = function lint(info, req, next) {
  if(!(this.file || this.json) || !req.document || !req.document.body) {
    return next(this.errors.EFILE_OPTION);
  }
  var method, opts, remote = (req.document && req.document.res);
  // TODO: check response headers for content-type
  // TODO: pass failing --json option through this test
  if(/\.json$/.test(this.file) || remote || this.json) {
    method = linter.json;
    opts = req.document.body;
  }else if(/\.js$/.test(this.file)) {
    method = linter.js;
    opts = {file: this.file, body: req.document.body}
  }
  method(opts, function(err, doc) {
    if(err) return next(Array.isArray(err) ? err[0] : err);
    req.print(doc, req, next);
  });
}
