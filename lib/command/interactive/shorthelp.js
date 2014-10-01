var help = require('cli-help');

module.exports = function shorthelp(info, req, next) {
  // so we don't attempt to show help for a subcommand
  req.unparsed = [];
  // show the cmd style help
  help.call(this, 'cmd', req, next);
}
