module.exports = function session(info, req, next){
  if(!info.args.length) {
    return req.error(this.errors.ENO_SUBCOMMAND, req, next);
  }
  info.validate(function response(err, parameters) {
    if(err) return req.error(err, req, next, parameters);
    req.document.local = true;
    next(info.cmd.commands());
  })
}
