var prompt = require('cli-input')
  , config = require('../../prompt')
  , colors = config.colors
  , completer = config.completer
  , location = config.location
  , options = require('./options')
  , ansi = require('ttycolor').ansi;

function welcome() {
  console.log(
    ansi('[' + this.name() + ']').normal.bg.black.valueOf(true)
      + ' %s (interactive console), started on ' + new Date(),
      this.version());

  var names = this.commands().exit.names().slice(0);
  var last = names.pop();
  console.log(
    ansi('[' + this.name() + ']').normal.bg.black.valueOf(true)
      + ' run %s for documentation, terminate session with %s or %s',
      this.commands().help.getLongName() + ' <cmd>',
      names.join(', '), last);
}

module.exports = function interactive(info, req, next) {

  var scope = this
    , log = this.log
    , clist = colors.call(scope, info, req)
    , opts = {
      completer: function rlcompleter(line, cb) {
        completer.call(scope, line, cb)
      },
      infinite: true,
      split: /\s+/,
      colors: clist()
    }
    , conf = this.configure()
    , ps = prompt(opts);

  opts.formats = {
    location: '%s> '
  }

  var getLocation = location.call(scope);

  opts.data = {};
  opts.data.location = getLocation;

  // flag as interactive console
  conf.interactive = true;

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
      //console.log('%s = %s', k, v);
      this[k] = v;
    }
    next();
  }

  // delete this command, cannot recurse into this handler
  //delete this.commands().interactive;

  //console.dir(this.commands().interactive);

  // hook up interactive specific commands and options
  options.call(scope, info , req);


  // get some input
  ps.on('value', function(val) {

    // empty string - nothing to execute
    if(!val) return;

    // cannot recurse into this command handler
    if(val.indexOf('i') === 0 || val.indexOf('interactive') === 0) {
      log.error('cannot nest interactive consoles');
      return;
    }

    // pause the prompt during execution
    ps.pause();

    // parse the argumente through *this* program
    // specify a callback so the middleware processing halts
    // on the first error and so the default program *complete*
    // listener does not fire
    scope.parse(val, function(err, req, parameters, e) {
      parameters = parameters || [];
      if(err && err !== true) {
        // little dance to ensure error parameters and
        // default error argument lookup are respected
        return req.error(err, req, function(err, args) {
          scope.raise(err, args);
          ps.resume();
        }, parameters);
      }
      ps.resume();
    });
  })

  welcome.call(this);

  // run the prompt
  ps.run();
}
