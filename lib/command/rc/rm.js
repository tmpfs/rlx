var set = require('./set');

module.exports = function rm(info, req, next){
  info.rm = true;
  if(info.args.length > 1) {
    info.args = info.args.slice(0, 1);
  }
  set.call(this, info, req, next);
}
