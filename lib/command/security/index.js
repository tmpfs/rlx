var commands = {
  get: require('./get'),
  rm: require('./rm'),
  set: require('./set')
}

module.exports = function security(info, req, next){
  if(!info.args.length) {
    return req.error(this.errors.ENO_SUBCOMMAND, req, next);
  }
  info.validate(function response(err, parameters) {
    if(err) return req.error(err, req, next, parameters);
    next(info.cmd.commands());
  })
}
