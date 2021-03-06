var prompt = require('../../prompt')
  , history = prompt.history
  , welcome = require('./welcome')
  , loc = require('../../util/location');

module.exports = function interactive(info, req, next) {
  var scope = this
    , log = this.log
    , dbh = req.db()
    , conf = this.configure();

  var possible = process.stdin.isTTY && process.stdout.isTTY;
  if(!possible) {
    return req.error(new Error(
      'unable to launch interactive console (not a tty)'), req, next);
  }

  //
  //dbh.removeAllListeners('401');
  //dbh.removeAllListeners('403');

  // --no-interactive and the i | interactive command
  // are mutually exclusive
  if(this.interactive === false) {
    log.warn('interactive console does not support %s (deleted)',
      this.options().interactive.toString(null));
    delete this.interactive;
    delete this.options().interactive;
  }

  // flag as interactive console
  conf.interactive = true;

  // must initialize prompt after interactive flag is set
  var ps = prompt.call(this);

  // store a reference to the prompt
  // in the program configuration so that
  // authentication handlers can resume the prompt
  conf.ps = ps;

  // now we don't want errors to quit the process
  conf.exit = false;

  // bail on first error
  conf.bail = true;

  // disable property conflict detection
  conf.conflict = false;

  conf.compiler.enabled = false;

  // set current working directory
  // based upon the arguments supplied
  // when the program was invoked
  loc.chdir.call(this);

  // modify the parser config to allow
  // long names without leading --
  conf.parser.configure = function(config) {
    if(req.rc.console.comment.enabled) {
      config.stop = [/^#/];
    }
    var ignores = ['--help'];
    function isIgnored(k) {
      var parts = k.split(/\s+/);
      for(var i = 0;i < parts.length;i++) {
        if(~ignores.indexOf(parts[i])) {
          return true;
        }
      }
      return false;
    }

    var k, v, p, n, re = /^--/, i;
    for(k in config.alias) {
      v = config.alias[k];
      if(isIgnored(k)) continue;
      p = k.split(' ').filter(function(a) {
        return re.test(a);
      }).map(function(l) {
        return l.replace(re, '');
      })
      n = k.split(' ').concat(p).join(' ');
      delete config.alias[k];
      config.alias[n] = v;
    }
  }

  // command is no longer required
  conf.command.required = false;
  function assign(req, err, next) {
    var trigger = [
      'server',
      'database',
      'id',
      'rev',
      'username',
    ]
    var shouldTrigger = false;
    var k, v, assigned = {};
    for(k in req.result.all) {
      v = this[k];
      assigned[k] = v;
      shouldTrigger = ~trigger.indexOf(k);
    }
    if(shouldTrigger) {
      loc.chdir.call(this);
    }
    ps.use({colors: scope.color});

    //console.log('parse complete %s', req.errors.has());
    //console.dir(req.result.unparsed);
    //console.log('parse complete %s', req.errors.cause);

    if(!req.errors.has() && req.result.unparsed.length) {
      this.raise(this.wrap(
        this.errors.EUNKNOWN_COMMAND, [req.result.unparsed[0]]));
      return next();
    }

    if(Object.keys(assigned).length && !req.unparsed.length) {
      return req.print(assigned, req, next);
    }

    next();
  }

  // keep reference so we can still reference the command
  var icmd = this.commands().interactive, k;

  // copy interactive commands to top-level
  for(k in icmd.commands()) {
    this.commands()[k] = icmd.commands()[k];
    //this.commands()[k]._parent = this;
  }

  // delete this command, cannot recurse into this handler
  delete this.commands().interactive;

  function run() {

    ps.on('rejected', function(val) {
      log.warn('aborted');
      //ps.options.infinite = true;
      //prompt.call(scope);
      //ps.resume();
    })

    // get some input
    ps.on('value', function(val, item) {
      var store, k, histitem;
      //console.dir(item);
      //console.log('val %j', val);

      // empty string - nothing to execute
      if(!val) return;

      store = req.history.store;
      if(Array.isArray(val)) {
        histitem = store.interpret((val || []).join(' '));
        if(histitem) {
          item.value = histitem;
          return ps.run([item]);
        }
      }

      //console.log('received value %s (%s)', val, typeof val);

      // warn on attempt to nest consoles
      if(~icmd.names().indexOf(val[0])) {
        log.warn(
          'cannot nest interactive consoles, %s has been removed',
          icmd.toString(null));
      }

      // pause the prompt during execution
      ps.pause();

      // parse the arguments through *this* program
      // specify a callback so the middleware processing halts
      // on the first error and so the default program *complete*
      // listener does not fire

      // must reset option values before parse so that
      // original options do not pass through to re-parsed commands

      scope.reset(scope);

      var allowed = req.rc.console.cascade.allow;
      for(k in scope) {
        if(!~allowed.indexOf(k)) {
          delete scope[k];
        }
      }

      scope.parse(val, function(req, err) {
        // handle non-command request
        if(req && !req.command) {
          return assign.call(scope, req, err, function(err) {
            ps.resume({infinite: true});
          });
        }
        ps.resume({infinite: true});
      });
    })

    // run the prompt
    ps.run();
  }

  // load command history file
  history.call(scope, info, req, function(err, store) {
    if(err) return req.error(err, req, next);

    // hook up the history store to mirror the readline history
    store.mirror(ps.readline);

    // print interactive console welcome message
    welcome.call(scope, info, req, function(err) {
      if(err) return req.error(err, req, next);
      run.call(this);
    })
  });

}
