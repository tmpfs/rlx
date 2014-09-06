function parse(file, req, cb) {
  var scope = this, errors = this.errors, wrap = this.wrap;
  //console.dir(errors);
  var func, tplreq = {vars: req.vars, file: file};
  try {
    func = require(file);
  }catch(e) {
    return cb.call(scope, e);
  }
  if(typeof func !== 'function') {
    return cb.call(scope, wrap(errors.ETEMPLATE_EXPORT, [file]));
  }
  func.call(req.vars, tplreq, function(err, doc) {
    if(err) return cb.call(scope, err);
    var isObject = doc && !Array.isArray(doc) && typeof doc === 'object';
    if(!isObject) {
      return cb.call(scope, wrap(errors.ETEMPLATE_RETURN, [file]));
    }
    cb.call(scope, null, doc);
  });
}

module.exports = parse;
