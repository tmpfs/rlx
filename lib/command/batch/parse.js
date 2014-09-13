var async = require('async');
var parser = require('../../util/batch').parse;
var resolve = require('../../util/resolve');

module.exports = function parse(info, req, next) {
  var scope = this
    , errors = this.errors
    , files = info.args.slice(0)
    , long = this.long;

  if(!info.args.length) {
    return req.error(
      errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }

  async.concatSeries(files, function(file, cb) {
    file = resolve(file);
    parser({file: file, include: long}, function(err, res) {
      cb(err, res);
    })
  }, function(err, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
