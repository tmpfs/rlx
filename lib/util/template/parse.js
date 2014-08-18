var fs = require('fs');

function parse(file, req, cb) {
  var scope = this;
  fs.readFile(file, function(err, data) {
    var func, tplreq = {vars: req.vars};
    try {
      func = require(file);
    }catch(e) {
      return cb.call(scope, e);
    }
    if(typeof func !== 'function') {
      return cb.call(scope, new Error('template does not export a function'));
    }
    func(tplreq, function(err, doc) {
      if(err) return cb.call(scope, err);
      cb.call(scope, null, doc);
    });
  });
}

module.exports = parse;
