var editor = require('../util/editor');

module.exports = function edit(info, req, next) {
  var opts = {file: this.file, hash: 'sha1'};
  var req = new editor.EditorRequest(opts, function(err, req) {
    if(err) return next(err);
    new editor.Edit(req, function(err, req, res, edit) {
      if(err) return next(err);
      var success = res.success();
      var modified = res.modified();
      console.log('start checksum: %s', req.checksum);
      console.log('end checksum: %s', res.checksum);
      console.log('file edit success: %s', success);
      console.log('file was modified: %s', modified);
      console.log('stats %j', req.stats);
      next();
    })
  });
}
