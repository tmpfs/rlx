var levels = require('cdb').log.levels;
var set = require('./set');

module.exports = function none(info, req, next){
  info.cmd.level = levels.none;
  set.call(this, info, req, next);

}
