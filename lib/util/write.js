var fs = require('fs');

function write(doc, req, next) {
  //console.log('write to file %s', this.output);
  fs.writeFile(this.output, doc, function(err) {
    if(err) return next(err);
    next();
  })
}

module.exports = write;
