var mkdirp = require('mkdirp')
  , input = require('cli-input')
  , history = input.history;

function histload(info, req, cb) {
  var scope = this;
  req.history.file = req.dirs.user.history;
  var opts = {}
  for(var k in req.rc.history) {
    opts[k] = req.rc.history[k];
  }

  if(Array.isArray(opts.ignores)) {
    for(var i = 0;i < opts.ignores.length;i++) {
      try {
        opts.ignores[i] = new RegExp(opts.ignores[i]);
      }catch(e) {
        return cb(e);
      }
    }
  }

  opts.file = req.history.file;
  opts.exit = true;
  mkdirp(req.dirs.user.home, function(err) {
    if(err) return cb.call(scope, err);
    req.history.manager = history(opts, function(err, store, hist) {
      if(err) return cb.call(scope, err);
      req.history.store = store;
      cb.call(scope, null, store, hist);
    });
  })
}

module.exports = histload;