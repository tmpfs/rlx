var couch = require('cdb');
var levels = couch.levels;
var set = require('./set');

module.exports = function debug(info, req, next){
  info.cmd.level = levels.debug;
  set.call(this, info, req, next);
}
