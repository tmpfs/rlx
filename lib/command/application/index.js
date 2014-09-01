var ls = require('./ls');

module.exports = function app(info, req, next){
  if(!info.args.length) {
    return ls.call(this, info, req, next);
  }
  // for these commands, --id and --ddoc are not interchangeable
  var ignore = ['show', 'list', 'update'];
  var cmd = info.args[0];
  if(cmd && !~ignore.indexOf(cmd)) {
    // --id and --ddoc are interoperable
    if(this.id && !this.ddoc) {
      this.ddoc = this.id;
    }else if(this.ddoc && !this.id) {
      this.id = this.ddoc;
    }
  }
  info.validate(function response(err, parameters) {
    if(err) return req.error(err, req, next, parameters);
    next(info.cmd.commands());
  })
}
