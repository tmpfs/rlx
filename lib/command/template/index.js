var commands = {
  ls: require('./ls'),
  get: require('./get'),
  parse: require('./parse')
}

module.exports = function template(info, req, next){
  if(!info.args.length) {
    return commands.ls.call(this, info, req, next);
  }
  info.validate(function response(err, parameters) {
    if(err) return req.error(err, req, next, parameters);
    next(info.cmd.commands());
  })
}
