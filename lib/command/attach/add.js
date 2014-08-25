var ProgressBar = require('../../util/progress');

module.exports = function add(info, req, next) {
  var opts = req.db.options(
    req, {db: this.database, id: this.id, attname: this.attachment});
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

  var conn = dbh.db.att.put(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  });

  dbh.db.once('open', function onopen(conn, stats) {
    var bar = ProgressBar();
    function progress(amount, uploaded, total, length) {
      bar(amount, length, total, uploaded === total);
    }
    conn.on('upload/progress', progress);
  })
}
