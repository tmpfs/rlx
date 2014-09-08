var prompt = require('cli-input');
var ansi = require('ttycolor').ansi;
module.exports = function interactive(info, req, next) {
  var scope = this
    , log = this.log
    , opts = {
      infinite: true,
      split: /\s+/,
      colors: {
        delimiter: function(v) {
          return ansi(v).cyan.valueOf(true);
        }
      }
    }
    , ps = prompt(opts);
  // now we don't want errors to quit the process
  this.configure().exit = false;

  // hook up interactive specific commands
  this.command('exit: q, quit, exit')
    .description('Quit interactive session')
    .action(function(info, req, next) {
      process.exit(0);
    });

  // get some input
  ps.on('value', function(val) {

    // empty string - nothing to execute
    if(!val) return;

    // cannot recurse into this command handler
    if(val.indexOf('i') === 0 || val.indexOf('interactive') === 0) return;

    // need to clear previously stashed data
    for(var z in scope) {
      delete scope[z];
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

  // run the prompt
  ps.run();
}
