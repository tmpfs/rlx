var levels = require('cdb').log.levels;
var set = require('./set');

module.exports = function debug(info, req, next){
  info.cmd.level = levels.debug;
  set.call(this, info, req, next);
}
