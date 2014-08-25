var progress = require('../../util/progress');

module.exports = function dl(info, req, next) {
  // TODO: respect --force for --output
  var opts = req.db.options(
    req, {
      db: this.database,
      id: this.id,
      attname: this.attachment,
      file: this.output});
  if(!opts.db) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  if(!opts.id) {
    return req.error(this.errors.EID_REQUIRED, req, next);
  }
  if(!opts.attname) {
    return req.error(this.errors.EATTACHMENT_REQUIRED, req, next);
  }

  var dbh = req.db();
  opts.progress = req.rc.progress && req.rc.progress.upload;
  var conn = dbh.db.att.get(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    next();
  });

  dbh.db.once('open', function(conn) {
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
