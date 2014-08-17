var fs = require('fs');
var environ = require('cli-command').env;

function parse(file, req, cb) {
  fs.readFile(file, function(err, data) {
    var contents = '' + data;
    // use custom variable arguments for parse
    var env = req.vars;
    contents = environ.replace(contents, env);
    if(/\.json/.test(file)) {
      contents = JSON.parse(contents);
    }
    cb(null, contents);
  });
}

module.exports = parse;
