module.exports = function print(info, req, next){
  var doc = this.configure().alias;
  if(doc === false) {
    return req.error(
      this.errors.EALIAS_FILE_REQUIRED, req, next,
      [req.dirs.user.alias, 'alias init']);
  }
  req.print(doc || {}, req, next);
}
