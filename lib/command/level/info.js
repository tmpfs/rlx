var levels = require('cdb').log.levels;
var set = require('./set');

module.exports = function info(info, req, next){
  info.cmd.level = levels.info;
  set.call(this, info, req, next);
}
