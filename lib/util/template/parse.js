var fs = require('fs');

function parse(file, req, cb) {
  fs.readFile(file, function(err, data) {
    var func, tplreq = {vars: req.vars};
    try {
      func = require(file);
    }catch(e) {
      return cb(e);
    }
    if(typeof func !== 'function') {
      return cb(new Error('template does not export a function'));
    }
    func(tplreq, function(err, doc) {
      if(err) return cb(err);
      cb(null, doc);
    });
  });
}

module.exports = parse;
