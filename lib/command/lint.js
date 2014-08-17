var linter = require('../util/lint');

module.exports = function lint(info, req, next) {
  var print = require('../util/print').bind(this);
  if(!this.file || !req.document || !req.document.body) {
    return next(this.errors.EFILE_OPTION);
  }
  var method, opts;
  if(/\.json$/.test(this.file)
    || (req.document && req.document.res)) {
    //console.log(req.document.body);
    method = linter.json;
    opts = req.document.body;
  }else if(/\.js$/.test(this.file)) {
    method = linter.js;
    opts = {file: this.file, body: req.document.body}
  }
  method(opts, function(err, doc) {
    //console.log('lint command callback');
    if(err) return next(Array.isArray(err) ? err[0] : err);
    //console.log('calling next');
    print(doc, req, next);
  });
}
