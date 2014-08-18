var commands = {
  ls: require('./ls'),
  rm: require('./rm'),
  add: require('./add'),
  get: require('./get')
}

var keys = Object.keys(commands);

module.exports = function config(info, req, next){
  if(!info.args.length) {
    return commands.ls.call(this, info, req, next);
  }
  if(!~keys.indexOf(info.args[0])) {
    return next(this.errors.EADMIN_COMMAND, [info.args[0]]);
  }
  next(info.cmd.commands());
}

