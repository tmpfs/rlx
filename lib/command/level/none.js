var couch = require('cdb');
var levels = couch.levels;
var set = require('./set');

module.exports = function none(info, req, next){
  info.cmd.level = levels.none;
  set.call(this, info, req, next);

}
