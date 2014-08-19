var commands = {
  info: require('./info'),
  add: require('./add'),
  rm: require('./rm'),
  exists: require('./exists'),
  commit: require('./commit'),
  compact: require('./compact'),
  cleanup: require('./cleanup'),
  limit: require('./limit'),
}

module.exports = function database(info, req, next){
  if(!info.args.length) {
    return req.error(this.errors.ENO_SUBCOMMAND, req, next);
  }
  info.validate(function response(err, parameters) {
    if(err) return req.error(err, req, next, parameters);
    next(info.cmd.commands());
  })
}
