module.exports = function env(info, req, next) {
  req.print(req.env, req, next);
}
