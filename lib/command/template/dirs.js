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
  return list;
}

module.exports = dirs;
