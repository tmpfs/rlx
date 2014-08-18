var commands = {
  ls: require('./ls'),
  add: require('./add'),
  get: require('./get'),
  rm: require('./rm'),
  passwd: require('./passwd'),
}

var keys = Object.keys(commands);

module.exports = function session(info, req, next){
  if(!info.args.length) {
    return commands.ls.call(this, info, req, next);
  }
  if(!~keys.indexOf(info.args[0])) {
    return next(this.errors.EUSER_COMMAND, [info.args[0]]);
  }
  next(info.cmd.commands());
}
