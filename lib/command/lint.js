var linter = require('../util/lint');
var types = require('../util/types');
var stringify = require('../util/stringify');

module.exports = function lint(info, req, next) {
  if(!req.document || !req.document.body) {
    return req.error(this.errors.EDOCUMENT_REQUIRED, req, next);
  }
  //console.dir(req.document.type);
  var method, opts, remote = (req.document && req.document.res);

  //console.dir(req.document);

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
