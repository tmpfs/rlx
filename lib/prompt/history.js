var mkdirp = require('mkdirp')
  , input = require('cli-input')
  , history = input.history;

function histload(info, req, cb) {
  var scope = this
    , opts = {}
    , k, i;
  req.history.file = req.dirs.user.history;
  for(k in req.rc.history) {
    opts[k] = req.rc.history[k];
  }

  if(Array.isArray(opts.ignores)) {
    for(i = 0;i < opts.ignores.length;i++) {
      try {
        opts.ignores[i] = new RegExp(opts.ignores[i]);
      }catch(e) {
        return cb(scope.wrap(
          scope.errors.EREGEXP_COMPILE,
          [opts.ignores[i], 'history.ignores'], e));
      }
    }
  }

  var conf = this.configure();

  opts.file = req.history.file;
  opts.exit = true;
  mkdirp(req.dirs.user.home, function(err) {
    if(err) return cb.call(scope, err);
    req.history.manager = history(opts, function(err, store, hist) {
      if(err) return cb.call(scope, err);
      req.history.store = store;

      // store non-transient reference to history
      conf.history = req.history;

      cb.call(scope, null, store, hist);
    });
  })
}

module.exports = histload;
