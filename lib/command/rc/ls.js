module.exports = function ls(info, req, next) {
  req.print(this.long ? req.runcontrol.store : req.runcontrol.files, req, next);
}
