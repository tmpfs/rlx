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
  info.validate(function response(err, parameters) {
    if(err) return req.error(err, req, next, parameters);
    next(info.cmd.commands());
  })
}
