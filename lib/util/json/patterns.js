var regexp = require('cli-regexp');

module.exports = function patterns(info, req) {
  var list = [], arg, i, l = info.args.length;
  for(i = 0;i < l;i++) {
    arg = info.args[i];
    if(regexp.seems(arg)) {
      list.push(arg);
      info.args.splice(i, 1);
      i--; l--;
    }
  }
  //console.dir(list);
  return list;
}
