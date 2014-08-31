var progress = require('../../util/progress');

module.exports = function dl(info, req, next) {

  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  if(!this.id) {
    return req.error(this.errors.EID_REQUIRED, req, next);
  }
  if(!this.attachment) {
    return req.error(this.errors.EATTACHMENT_REQUIRED, req, next);
  }

  if(!this.output) {
    return req.error(this.errors.EOUTPUT_REQUIRED, req, next);
  }

  if(req.output.exists && !this.force) {
    return req.error(this.errors.EFS_FILE_EXISTS, req, next);
  }

  var opts = req.db.options(
    req, {
      db: this.database,
      id: this.id,
      attname: this.attachment,
      file: this.output});
  var dbh = req.db();
  opts.progress = req.rc.progress && req.rc.progress.upload;
  var conn = dbh.att.get(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    next();
  });

  dbh.att.once('open', function(conn) {
    var bar = progress({prefix: 'get'});
    function onprogress(amount, uploaded, total, length) {
      var end = uploaded === total;
      bar(amount, length, total, end);
      if(end) {
        conn.removeListener('progress', onprogress);
      }
    }
    conn.on('progress', onprogress);
  })
}
