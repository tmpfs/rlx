var linter = require('../util/lint');
var types = require('../util/types');
var stringify = require('../util/stringify');

module.exports = function lint(info, req, next) {
  if(!req.document || !req.document.body) {
    // TODO: change this to file input required
    return next(this.errors.EFILE_OPTION);
  }
  //console.dir(req.document.type);
  var method, opt, remote = (req.document && req.document.res);
  // TODO: check response headers for content-type
  // TODO: pass failing --json option through this test
  if(req.document.type === types.json) {
    var body = typeof req.document.body === 'string' ?
      req.document.body : stringify(req.document.body);
    method = linter.json;
    opts = body;
  }else if(/\.js$/.test(this.file)) {
    method = linter.js;
    opts = {file: this.file, body: req.document.body}
  }
  method(opts, function(err, doc) {
    if(err) return next(Array.isArray(err) ? err[0] : err);
    req.print(doc, req, next);
  });
}
