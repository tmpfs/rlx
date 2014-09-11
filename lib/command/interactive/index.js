var prompt = require('../../prompt')
  , history = prompt.history
  , welcome = require('./welcome');

module.exports = function interactive(info, req, next) {
  var scope = this
    , log = this.log
    , conf = this.configure();

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

  // disable property conflict detection
  conf.conflict = false;

  // command is no longer required
  // allows options to just set propertes, eg: --http --trace
  conf.command.required = function(req, next) {
    var k, v;
    for(k in req.result.all) {
      v = req.result.all[k];
      this[k] = v;
    }
    ps.use({colors: scope.color});
    next();
  }

  // keep reference so we can still reference the command
  var icmd = this.commands().interactive, k;

  // copy interactive commands to top-level
  for(k in icmd.commands()) {
    this.commands()[k] = icmd.commands()[k];
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

      //console.dir(item);
      //console.log('val %j', val);

      // empty string - nothing to execute
      if(!val) return;

      var store = req.history.store;
      if(Array.isArray(val)) {
        var histitem = store.interpret((val || []).join(' '));
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

      //console.log('re-parsing...%j', val);
      //console.dir(item);
      scope.parse(val, function(err, req, parameters, e) {
        parameters = parameters || [];
        //console.log('parse complete');
        if(err && err !== true) {
          // little dance to ensure error parameters and
          // default error argument lookup are respected
          return req.error(err, req, function(err, args) {
            scope.raise(err, args);
            ps.resume();
          }, parameters);
        }
        //console.log('resuming...');
        //console.dir(prompt.prompts.interactive);
        //ps.setOptions(prompt.prompts.interactive);

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
