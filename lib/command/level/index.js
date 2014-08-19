var couch = require('cdb');
var levels = couch.levels;
var get = require('./get');

var commands = {}
var keys = Object.keys(levels);
keys.forEach(function(key) {
  commands[key] = require('./' + key);
})
keys = Object.keys(commands);

module.exports = function level(info, req, next){
  if(!info.args.length) {
    return get.call(this, info, req, next);
  }
  if(!~keys.indexOf(info.args[0])) {
    return next(this.errors.ELEVEL_COMMAND, [info.args[0]]);
  }
  next(info.cmd.commands());
}
