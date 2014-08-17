var linter = require('../util/lint');

module.exports = function lint(info, req, next) {
  var print = require('../util/print').bind(this);
  if(!this.file || !req.document || !req.document.body) {
    return next(this.errors.EFILE_OPTION);
  }
  var method;
  if(/\.json/.test(this.file)) {
    method = linter.json;
  }
  method(req.document.body, function(err, doc) {
    if(err) return next(err);
    next();
  });
}
