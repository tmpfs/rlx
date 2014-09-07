var docs = require('../../util/docs');
var direxists = require('../../util/direxists');

module.exports = function pull(info, req, next) {
  var scope = this
    , errors = this.errors
    , lenient = this.lenient
    , strict = this.strict
    , flat = this.flat;

  if(!this.database) {
    return req.error(errors.EDATABASE_REQUIRED, req, next);
  }

  if(info.args.length < 2) {
    return req.error(errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }

  var target = info.args.pop();
  var opts = {
    ids: info.args, lenient: lenient, strict: strict, flat: flat, long: true};

  function fetch(dir) {
    opts.dir = dir;
    docs.fetch(opts, info, req, function(err, doc) {
      if(err) return req.error(err, req, next);
      if(strict && doc.err.length) {
        return req.print(doc.err, req, next);
      }
      req.print(doc.files, req, next);
    })
  }

  direxists.call(this, target, function(err, dir, stat) {
    if(err) return req.error(err, req, next);
    fetch.call(scope, dir);
  })
}
