module.exports = function print(info, req, next){
  req.print(this.configure().alias || {}, req, next);
}
