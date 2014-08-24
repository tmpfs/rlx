function parse(file, req, cb) {
  var scope = this;
  var func, tplreq = {vars: req.vars, file: file};
  try {
    func = require(file);
  }catch(e) {
    return cb.call(scope, e);
  }
  if(typeof func !== 'function') {
    return cb.call(scope, new Error('template does not export a function'));
  }
  func.call(req.vars, tplreq, function(err, doc) {
    if(err) return cb.call(scope, err);
    cb.call(scope, null, doc);
  });
}

module.exports = parse;
