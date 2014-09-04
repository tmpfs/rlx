module.exports = function print(info, req, next){
  //console.dir('print');
  //console.dir(req.rc);
  req.print(req.rc, req, next);
}
