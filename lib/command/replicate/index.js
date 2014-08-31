var start = require('./start');

module.exports = function replicate(info, req, next){
  if(!info.args.length) {
    return start.call(this, info, req, next);
  }
  info.validate(function response(err, parameters) {
    if(err) return req.error(err, req, next, parameters);
    next(info.cmd.commands());
  })
}
