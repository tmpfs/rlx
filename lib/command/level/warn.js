var couch = require('cdb');
var levels = couch.levels;
var set = require('./set');

module.exports = function warn(info, req, next){
  info.cmd.level = levels.warn;
  set.call(this, info, req, next);
}
