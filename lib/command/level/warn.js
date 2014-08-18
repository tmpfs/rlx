var couch = require('../../util/couch');
var levels = couch.levels;
var set = require('./set');

module.exports = function warn(info, req, next){
  info.cmd.level = levels.warning;
  set.call(this, info, req, next);
}
