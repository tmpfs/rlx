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
    //console.log(new RegExp('{1,2}+'));
    for(i = 0;i < opts.ignores.length;i++) {
      try {
        opts.ignores[i] = new RegExp(opts.ignores[i]);
      }catch(e) {
        //console.dir(e)
        //console.log('history pattern compile error %s', cb);
        return cb(e);
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
