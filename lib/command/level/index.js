var levels = require('cdb').log.levels;
var get = require('./get');

var commands = {}
var keys = Object.keys(levels);
keys.forEach(function(key) {
  commands[key] = require('./' + key);
})

module.exports = function level(info, req, next){
  if(!info.args.length) {
    return get.call(this, info, req, next);
  }
  info.validate(function response(err, parameters) {
    if(err) return req.error(err, req, next, parameters);
    next(info.cmd.commands());
  })
}
