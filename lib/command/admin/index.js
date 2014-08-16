var commands = {
  get: require('./get'),
  rm: require('./rm'),
  set: require('./set')
}

var keys = Object.keys(commands);

module.exports = function config(info, req, next){
  if(!info.args.length) {
    return commands.get.call(this, info, req, next);
  }
  if(!~keys.indexOf(info.args[0])) {
    return next(this.errors.EADMIN_COMMAND, [info.args[0]]);
  }
  next(info.cmd.commands());
}

