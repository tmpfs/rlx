var commands = {
  ls: require('./ls'),
  rm: require('./rm'),
  add: require('./add')
}

var keys = Object.keys(commands);

module.exports = function build(info, req, next){
  if(!info.args.length) {
    return all.call(this, info, req, next);
  }
  if(!~keys.indexOf(info.args[0])) {
    return next(this.errors.EDATABASE_COMMAND, [info.args[0]]);
  }
  next(info.cmd.commands());
}
