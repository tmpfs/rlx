var fs = require('fs');
var Readable = require('stream').Readable;

function write(doc, req, next) {
  var isStream = (doc instanceof Readable);
  if(req.output.exists && !this.force) {
    return req.error(this.errors.EFS_FILE_EXISTS, req, next);
  }
  if(isStream) {
    doc.once('end', function() {
      next();
    })
    doc.pipe(fs.createWriteStream(this.output));
  }else{
    fs.writeFile(this.output, doc, function(err) {
      if(err) return req.error(err, req, next);
      next();
    })
  }
}

module.exports = write;
