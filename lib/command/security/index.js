var commands = {
  get: require('./get'),
  set: require('./set')
}

var keys = Object.keys(commands);

module.exports = function security(info, req, next){
  if(!info.args.length) {
    return req.error(this.errors.ENO_SUBCOMMAND, req, next);
  }
  if(!~keys.indexOf(info.args[0])) {
    return next(this.errors.ESECURITY_COMMAND, [info.args[0]]);
  }
  next(info.cmd.commands());
}
