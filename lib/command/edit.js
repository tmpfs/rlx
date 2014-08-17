var editor = require('../util/editor');

module.exports = function edit(info, req, next) {
  var scope = this, log = this.log;
  var verbose = this.verbose === true;
  var req = new editor.EditorRequest({file: this.file}, function(err, req) {
    if(err) return next(err);
    new editor.Edit(req, function(err, req, res, edit) {
      if(err) return next(err);
      var success = res.success();
      var modified = res.modified();
      console.log('file edit success: %s', success);
      console.log('file was modified: %s', modified);
      next();
    })
  });
}
