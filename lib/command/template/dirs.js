/**
 *  Work out which directories should be searched
 *  for templates.
 */
function dirs(req) {
  var sys = [req.dirs.tpl.system];
  var usr = [req.dirs.user.template];
  var all = [req.dirs.user.template, req.dirs.tpl.system];
  var list = this.system ? sys : all;
  if(this.user) list = usr;
  var custom = null;
  if(req.rc.search && req.rc.search.paths && req.rc.search.paths.template) {
    custom = req.rc.search.paths.template;
  }
  if(Array.isArray(custom) && custom.length) {
    list = custom.concat(list);
  }
  if(Array.isArray(this.searchPath) && this.searchPath.length) {
    list = this.searchPath.concat(list);
  }
  return list;
}

module.exports = dirs;
