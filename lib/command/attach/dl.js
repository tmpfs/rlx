var fs = require('fs');
var download = require('../../util/attach').dl;

module.exports = function dl(info, req, next) {
  var scope = this, errors = this.errors;

  if(!this.database) {
    return req.error(errors.EDATABASE_REQUIRED, req, next);
  }

  if(!this.id && !this.ddoc) {
    return req.error(errors.EID_REQUIRED, req, next);
  }

  if(info.args.length < 2) {
    return req.error(
      errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd._extra]);
  }

  var dir = info.args.pop();

  var files = info.args || [];
  if(this.attachment) {
    files.unshift(this.attachment);
  }

  if(!files.length && !this.glob.length) {
    return req.error(errors.EFILES_REQUIRED, req, next);
  }

  function run(dir) {
    var opts = {
      files: files,
      patterns: this.glob && this.glob.length ? this.glob : null,
      output: dir
    }

    //var scope = this;
    download.call(this, opts, info, req, next, function(err, doc) {
      if(err) return req.error(err, req, next);
      if(!doc.length) {
        return req.error(errors.ENO_FILES_FOUND, req, next);
      }
      req.print(doc, req, next);
    })
  }

  fs.stat(dir, function(err, stats) {
    if(err || stats && !stats.isDirectory()) {
      return req.error(errors.EOUTPUT_DIRECTORY, req, next, [dir]);
    }
    run.call(scope, dir);
  })
}
