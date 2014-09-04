var fs = require('fs');
var Readable = require('stream').Readable;

function write(doc, req, options, next) {
  if(typeof options === 'function') {
    next = options;
    options = null;
  }
  options = options || {};
  options.output = options.output || this.output;
  var isStream = (doc instanceof Readable);
  if(req.output.exists && !this.force) {
    return req.error(this.errors.EFS_FILE_EXISTS, req, next);
  }
  if(isStream) {
    doc.once('end', function() {
      next();
    })
    doc.pipe(fs.createWriteStream(options.output));
  }else{
    fs.writeFile(options.output, doc, function(err) {
      if(err) return req.error(err, req, next);
      next();
    })
  }
}

module.exports = write;
