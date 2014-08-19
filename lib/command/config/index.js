var commands = {
  get: require('./get'),
  rm: require('./rm'),
  set: require('./set')
}

module.exports = function config(info, req, next){
  if(!info.args.length) {
    return commands.get.call(this, info, req, next);
  }
  info.validate(function response(err, parameters) {
    if(err) return req.error(err, req, next, parameters);
    next(info.cmd.commands());
  })
}
