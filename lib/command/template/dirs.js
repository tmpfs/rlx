var uniq = require('cli-util').uniq;

/**
 *  Work out which directories should be searched
 *  for templates.
 */
function dirs(req) {
  var sd = req.dirs.tpl.system;
  var ud = req.dirs.user.template;
  var list = [ud, sd];
  //if(this.user) list = [ud];
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
  var ind = list.indexOf(sd);
  if(this.system === false && ~ind) {
    list.splice(ind, 1);
  }
  ind = list.indexOf(ud);
  if(this.user === false && ~ind) {
    //console.log(list);
    list.splice(ind, 1);
  }

  // when invoked with --no-system and --no-user
  // and there are no rc or cli search paths
  // default to system
  if(!list.length) {
    list.push(sd);
  }
  list = uniq(list);
  return list.reverse();
}

module.exports = dirs;
