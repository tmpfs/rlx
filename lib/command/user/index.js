var commands = {
  ls: require('./ls'),
  add: require('./add'),
  get: require('./get'),
  rm: require('./rm'),
  passwd: require('./passwd'),
  edit: require('./edit')
}

module.exports = function user(info, req, next){
  if(!info.args.length) {
    return commands.ls.call(this, info, req, next);
  }
  info.validate(function response(err, parameters) {
    if(err) return req.error(err, req, next, parameters);
    next(info.cmd.commands());
  })
}
