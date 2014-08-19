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

var keys = Object.keys(commands);

module.exports = function database(info, req, next){
  if(!info.args.length) {
    return req.error(this.errors.ENO_SUBCOMMAND, req, next);
  }
  if(!~keys.indexOf(info.args[0])) {
    return req.error(this.errors.EDATABASE_COMMAND, req, next);
  }
  next(info.cmd.commands());
}
