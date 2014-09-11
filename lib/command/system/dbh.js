module.exports = function dbhandle(info, req, next) {
  req.print(req.db(), req, next);
}
