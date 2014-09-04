module.exports = function dir(info, req, next) {
  req.print(req.runcontrol.path, req, next);
}
