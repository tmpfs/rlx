function json(data, cb) {
  var jsonlint = require('jsonlint');
  var result;
  try{
    result = jsonlint.parse(data);
  }catch(e) {
    return cb(e);
  }
  cb(null, result);
}

function js(options, cb) {
  options = options || {};
  var jslint = require('jslint');
  var opts = options.lint || {
    edition: 'latest',
    length: 100
  }
  function toError(errors) {
    var err = errors[0];
    var msg = err.reason
      + ' (' + options.file + ':' + err.line + ':' + err.character + ')';
    var e = new Error(msg);
    return e;
  }
  var ls = new jslint.LintStream(opts);
  ls.write({file: options.file, body: options.body});
  ls.on('data', function(chunk, encoding, callback) {
    var ok = chunk.linted.ok;
    if(!ok) cb(toError(chunk.linted.errors), options.body);
    cb(null, options.body);
  })
}

module.exports = {
  json: json,
  js: js
}
