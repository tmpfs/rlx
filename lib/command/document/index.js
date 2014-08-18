var commands = {
  rev: require('./rev'),
  add: require('./add'),
  rm: require('./rm'),
  get: require('./get'),
  ls: require('./ls')
}

var keys = Object.keys(commands);

module.exports = function session(info, req, next){
  if(!info.args.length) {
    return commands.ls.call(this, info, req, next);
  }
  if(!~keys.indexOf(info.args[0])) {
    return next(this.errors.EDOC_COMMAND, [info.args[0]]);
  }
  next(info.cmd.commands());
}
