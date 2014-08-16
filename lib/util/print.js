var EOL = require('os').EOL;
var stringify = require('./stringify');
var write = require('./write');

function print(doc, req, next) {
  var indent = parseInt(this.indent) || 2;
  var stream = req.stream || process.stdout;
  var contents = stringify(doc, indent) + EOL
  if(this.output) {
    return write.call(this, contents, req, next);
  }
  stream.write(contents);
  next();
}

module.exports = print;
