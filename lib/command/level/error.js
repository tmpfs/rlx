var couch = require('cdb');
var levels = couch.levels;
var set = require('./set');

module.exports = function error(info, req, next){
  info.cmd.level = levels.error;
  set.call(this, info, req, next);
}
