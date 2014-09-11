module.exports = function auth(info, req, next) {
  req.print(this.configure().authinfo || {}, req, next);
}
