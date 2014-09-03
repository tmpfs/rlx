module.exports = function init(info, req, next) {
  console.dir(req.dirs);
  next();
}
