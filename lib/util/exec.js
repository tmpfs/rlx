var cpexec = require('child_process').exec;

function exec(opts, cb) {
  var cmd = opts.cmd;
  var cpopts = opts.options || {stdio: 'inherit'};
  cpexec(cmd, cpopts, function(err, stdout, stderr) {
    var code = err && err.code ? err.code : 0;
    cb(err, {out: stdout, err: stderr, code: code});
  })
}

module.exports = exec;
