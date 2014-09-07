var prompt = require('cli-input');
module.exports = function interactive(info, req, next) {
  var scope = this
    , opts = {infinite: true, split: /\s+/}
    , ps = prompt(opts);
  this.configure().exit = false;
  this.command('exit: q, quit, exit', 'Quit interactive session');
  var names = this.commands().exit.names().slice(0);
  ps.on('value', function(val) {
    if(val.length === 1 && ~names.indexOf(val[0])) {
      process.exit(0);
    }
    if(!val) return;
    if(~val.indexOf('i') || ~val.indexOf('interactive')) return;

    // need to clear previously stashed data
    for(var z in scope) {
      delete scope[z];
    }

    ps.pause();

    // parse the argumente through *this* program
    // specify a callback so the middleware processing halts
    // on the first error and so the default program *complete*
    // listener does not fire
    scope.parse(val, function(err, req, parameters, e) {
      parameters = parameters || [];
      if(err && err !== true) {
        return req.error(err, req, function(err, args) {
          scope.raise(err, args);
        }, parameters);
      }
      ps.resume();
    });
  })
  ps.run();
}
