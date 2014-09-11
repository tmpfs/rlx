module.exports = function request(info, req, next) {
  req.print({info: info, req: req}, req, next);
}
