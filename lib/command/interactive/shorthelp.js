var help = require('cli-command').help;

module.exports = function shorthelp(info, req, next) {
  req.unparsed = [];
  help.call(this, 'cmd', next);
}
