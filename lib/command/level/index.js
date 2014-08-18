var couch = require('../../util/couch');
var section = couch.sections.log;
var levels = couch.levels;

var commands = {}
var keys = Object.keys(levels);
keys.forEach(function(key) {
  key = key.replace(/ing$/, '');
  commands[key] = require('./' + key);
})
keys = Object.keys(commands);

module.exports = function level(info, req, next){
  console.log('level called %j', info.args);
  if(!info.args.length) {
    // TODO: get the log level
    return commands.info.call(this, info, req, next);
  }
  if(!~keys.indexOf(info.args[0])) {
    // TODO: add this error def
    return next(this.errors.ELEVEL_COMMAND, [info.args[0]]);
  }
  next(info.cmd.commands());
}
