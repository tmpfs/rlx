var alias = require('../../util/alias');
var chdir = require('../../util/chdir');

module.exports = function get(info, req, next){
  if(!info.args.length) {
    return req.error(
      this.errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }

  var aliases = this.configure().alias;
  if(aliases === false) {
    return req.error(
      this.errors.EALIAS_FILE_REQUIRED, req, next,
      [req.dirs.user.alias, 'alias init']);
  }
  var as = alias.strip(req, info.args[0])
    , conf = this.configure();
  var doc = alias.find.call(this, as, aliases);
  if(!doc) {
    return req.error(this.errors.EUNKNOWN_ALIAS, req, next, [as]);
  }

  // don't want to change location
  if(conf.interactive) {
    return req.print(doc, req, next);
  }

  // when running from the cli more useful to
  // print working directory information
  chdir.call(this, info.args[0], req, function(err, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
