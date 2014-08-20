var editor = require('../util/editor');

module.exports = function edit(info, req, next) {

  //console.log(req.document.body);
  //
  //var tmp = this

  if(req.document.body) {
    console.log('editing loaded file contents...');
    console.dir(req.document);
  }

  return next();

  var opts = {file: info.args[0] || this.file, hash: req.rc.edit.hash};
  req.edit(info, req, next, opts, function(ereq, eres, edit) {
    var success = eres.success();
    var modified = eres.modified();
    console.log('start checksum: %s', ereq.checksum);
    console.log('end checksum: %s', eres.checksum);
    console.log('file edit success: %s', success);
    console.log('file was modified: %s', modified);
    console.log('stats %j', ereq.stats);
  });
}
