module.exports = function print(info, req, next){
  var doc = this.configure().alias;
  if(doc === false) {
    this.log.warn('%s does not exist, run %s',
      req.dirs.user.alias, 'alias init');
  }
  req.print(doc || {}, req, next);
}
