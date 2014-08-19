var fs = require('fs');
var Readable = require('stream').Readable;

function write(doc, req, next) {
  var force = this.force, output = this.output, errors = this.errors;
  var isStream = (doc instanceof Readable);
  if(isStream) {
    doc.once('end', function() {
      next();
    })
    doc.pipe(fs.createWriteStream(this.output));
  }else{
    fs.exists(output, function(exists) {
      if(exists && !force) {
        return req.error(errors.EFS_FILE_EXISTS, req, next, [output]);
      }
      fs.writeFile(output, doc, function(err) {
        if(err) return req.error(err, req, next);
        next();
      })
    });
  }
}

module.exports = write;
