var alias = require('../../util/alias');
var stringify = require('../../util/stringify');
var write = require('../../util/write');

module.exports = function add(info, req, next){
  if(!info.args.length) {
    return req.error(
      this.errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }
  var aliases = this.configure().alias
    , file = req.dirs.user.alias;
  if(aliases === false) {
    return req.error(
      this.errors.EALIAS_FILE_REQUIRED, req, next,
      [file, 'alias init']);
  }
  var as = alias.strip(req, info.args[0]);
  var doc = alias.find.call(this, as, aliases);
  if(doc && !this.force) {
    return req.error(this.errors.EALIAS_EXISTS, req, next,
      [as, this.options().force.toString(null)]);
  }

  doc = {alias: alias.build.call(this, req.result.options)};
  if(!Object.keys(doc.alias).length) {
    return req.error(this.errors.EALIAS_EMPTY, req, next, [as]);
  }
  doc.file = file;
  aliases[as] = doc.alias;
  var opts = {output: file};
  var contents = stringify(aliases, null, req.rc.indent);
  write.call(this, contents, req, opts, function(err) {
    if(err) return req.error(err, req, next);
    doc.ok = true;
    // for show only, the key is the name
    doc.alias.name = as;
    req.print(doc, req, next);
  })
}
