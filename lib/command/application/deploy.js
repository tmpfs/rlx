var push = require('./push');

module.exports = function deploy(info, req, next) {
  info.deploy = true;
  info.callback = true;
  push.call(this, info, req, function(err, res, doc) {
    var result = {ok: doc.ok, rev: doc.rev};
    req.print(result, req, next);
  });
}
