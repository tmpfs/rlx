var commands = {
  ls: require('./ls'),
  add: require('./add'),
  get: require('./get'),
  rm: require('./rm'),
  passwd: require('./passwd'),
  edit: require('./edit')
}

var keys = Object.keys(commands);

module.exports = function user(info, req, next){
  if(!info.args.length) {
    return commands.ls.call(this, info, req, next);
  }
  if(!~keys.indexOf(info.args[0])) {
    return next(this.errors.EUSER_COMMAND, [info.args[0]]);
  }
  next(info.cmd.commands());
}
