var temp = require('./temp');

module.exports = function config(info, req, next){
  if(!info.args.length) {
    return temp.call(this, info, req, next);
  }
  info.validate(function response(err, parameters) {
    if(err) return req.error(err, req, next, parameters);
    next(info.cmd.commands());
  })
}
