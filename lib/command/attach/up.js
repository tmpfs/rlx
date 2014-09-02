var path = require('path');
var progress = require('../../util/progress');
var upload = require('../../util/attach').up;

module.exports = function up(info, req, next) {
  var attname = this.attachment ?
    this.attachment :
    (this.file ? path.basename(this.file) : null);

  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }

  if(!this.id && !this.ddoc) {
    return req.error(this.errors.EID_REQUIRED, req, next);
  }

  var files = info.args || [];
  if(this.file) {
    files.unshift(this.file);
  }

  if(!files.length) {
    return req.error(this.errors.EFILES_REQUIRED, req, next);
  }

  var opts = {
    files: files,
    attname: attname
  }

  upload.call(this, opts, info, req, next, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
