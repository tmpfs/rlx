module.exports = function conf(info, req, next) {
  req.print(this.configure(), req, next);
}
