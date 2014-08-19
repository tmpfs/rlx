var levels = require('cdb').log.levels;
var set = require('./set');

module.exports = function warn(info, req, next){
  info.cmd.level = levels.warn;
  set.call(this, info, req, next);
}
