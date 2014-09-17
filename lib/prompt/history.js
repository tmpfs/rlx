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
