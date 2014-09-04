module.exports = function print(info, req, next){
  req.print(req.rc, req, next);
}
