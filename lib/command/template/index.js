var commands = {
  ls: require('./ls')
}

var keys = Object.keys(commands);

module.exports = function template(info, req, next){
  if(!info.args.length) {
    return commands.ls.call(this, info, req, next);
  }
  if(!~keys.indexOf(info.args[0])) {
    return next(this.errors.ETEMPLATE_COMMAND, [info.args[0]]);
  }
  next(info.cmd.commands());
}
