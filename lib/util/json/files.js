var regexp = require('cli-regexp');

module.exports = function files(info, req) {
  var list = [], arg, i, l = info.args.length;
  for(i = 0;i < l;i++) {
    arg = info.args[i];
    if(/\.json$/.test(arg)) {
      list.push(arg);
      info.args.splice(i, 1);
      i--; l--;
    }
  }
  return list;
}
