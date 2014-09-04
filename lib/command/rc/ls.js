module.exports = function ls(info, req, next) {
  req.print(req.runcontrol.store, req, next);
}
