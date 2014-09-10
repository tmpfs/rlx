var funcs = {};

funcs.print = function print(info, req, next) {
  req.print(this, req, next);
}

module.exports = function debug(info, req, next) {
  var doc = {};
  var func = info.args[0];
  if(!func) return funcs.print.call(this, info, req, next);
  var method = funcs[func];
  if(!method) {
    return req.error('unknown debug command %s', req, next, [func]);
  }
  req.print(doc, req, next);
}
