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
    return next(this.errors.ENO_DATABASE_COMMAND);
  }
  if(!~keys.indexOf(info.args[0])) {
    return next(this.errors.EDATABASE_COMMAND, [info.args[0]]);
  }
  next(info.cmd.commands());
}
