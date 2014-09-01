module.exports = function attach(info, req, next) {
  info.defer(this.commands().attach, info, req, next);
}
