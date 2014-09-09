var help = require('cli-command').help;

/**
 *  Add options specific to interactive mode.
 */
function options(info, req) {
  this.command('exit: q, quit, exit')
    .description('Quit interactive session')
    .action(function(info, req, next) {
      process.exit(0);
    });

  // additional help command alias
  this.command('shorthelp: ?')
    .description('quick help')
    .action(function(info, req, next) {
      req.unparsed = [];
      help.call(this, 'cmd', next);
      //next();
    })
}

module.exports = options;
