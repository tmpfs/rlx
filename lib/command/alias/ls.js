var loc = require('../../util/location');
module.exports = function ls(info, req, next){
  var doc = this.configure().alias;
  if(doc === false) {
    return req.error(
      this.errors.EALIAS_FILE_REQUIRED, req, next,
      [req.dirs.user.alias, 'alias init']);
  }
  var out = {}, k, v;
  for(k in doc) {
    v = doc[k];
    out[k] = this.long ? v : loc.getdir.call(this, v).url;
  }
  req.print(out, req, next);
}
