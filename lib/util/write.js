var fs = require('fs');
var Readable = require('stream').Readable;

function write(doc, req, next) {
  var isStream = (doc instanceof Readable);
  if(isStream) {
    doc.on('end', function() {
      next();
    })
    doc.pipe(fs.createWriteStream(this.output));
  }else{
    fs.writeFile(this.output, doc, function(err) {
      if(err) return next(err);
      next();
    })
  }
}

module.exports = write;
