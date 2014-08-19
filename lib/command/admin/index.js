var commands = {
  ls: require('./ls'),
  rm: require('./rm'),
  add: require('./add'),
  get: require('./get')
}

module.exports = function config(info, req, next){
  if(!info.args.length) {
    return commands.ls.call(this, info, req, next);
  }
  info.validate(function response(err, parameters) {
    if(err) return req.error(err, req, next, parameters);
    next(info.cmd.commands());
  })
}

