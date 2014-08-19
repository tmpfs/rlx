var levels = require('cdb').log.levels;
var set = require('./set');

module.exports = function error(info, req, next){
  info.cmd.level = levels.error;
  set.call(this, info, req, next);
}
