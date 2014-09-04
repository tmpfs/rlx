var print = require('./print');

module.exports = function rc(info, req, next){
  if(!info.args.length) {
    return print.call(this, info, req, next);
  }
  info.validate(function response(err, parameters) {
    if(err) return req.error(err, req, next, parameters);
    next(info.cmd.commands());
  })
}
