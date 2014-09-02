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
    files.push(this.file);
  }

  var opts = {
    files: files,
    attname: attname
  }

  upload.call(this, opts, info, req, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })

  //var opts = req.db.options(
    //req,
    //{
      //db: this.database,
      //id: this.id,
      //attname: attname,
      //file: this.file,
      //ddoc: this.ddoc
    //}
  //);
  //var dbh = req.db();
  //opts.progress = req.rc.progress && req.rc.progress.upload;

  //var conn = dbh.att.put(opts, function(err, res, doc) {
    //if(req.auth(info, req, err)) {
      //return;
    //}
    //if(err) return req.error(err, req, next);
    //req.print(doc, req, next);
  //});

  //dbh.att.once('open', function onopen(conn, stats) {
    //var bar = progress();
    //function onprogress(amount, uploaded, total, length) {
      //var end = uploaded === total;
      //bar(amount, length, total, end);
      //if(end) {
        //conn.removeListener('progress', onprogress);
      //}
    //}
    //conn.on('progress', onprogress);
  //})
}
