var EOL = require('os').EOL;
var stringify = require('./stringify');
var write = require('./write');
var Readable = require('stream').Readable;

function print(doc, req, next) {
  var isStream = (doc instanceof Readable)
  var indent = this.indent || 2;
  var stream = req.stream || process.stdout;
  var contents;
  if(!isStream) {
    contents = req.text ? doc : stringify(doc, indent) + EOL
  }
  delete req.text;
  if(this.output) {
    return write.call(this, isStream ? doc : contents, req, next);
  }
  !isStream ? stream.write(contents) : doc.pipe(stream);
  if(!isStream) {
    next();
  }else{
    doc.once('end', function() {
      next();
    })
  }
}

module.exports = print;
