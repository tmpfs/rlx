var path = require('path');
var progress = require('../../util/progress');

module.exports = function up(info, req, next) {

  var attname = this.attachment ?
    this.attachment :
    (this.file ? path.basename(this.file) : null);


  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  if(!this.id) {
    return req.error(this.errors.EID_REQUIRED, req, next);
  }

  if(!this.file) {
    return req.error(this.errors.EFILE_REQUIRED, req, next);
  }

  if(!this.attachment && !this.file) {
    return req.error(this.errors.EATTACHMENT_REQUIRED, req, next);
  }

  var opts = req.db.options(
    req, {db: this.database, id: this.id, attname: attname, file: this.file});
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
    var bar = progress();
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