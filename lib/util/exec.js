var cpexec = require('child_process').exec;

function exec(opts, cb) {
  var scope = this
    , conf = this.configure();
  var cmd = opts.cmd;
  var cpopts = opts.options || {stdio: 'inherit'};
  if(conf.ps) {
    conf.ps.pause();
  }
  cpexec(cmd, cpopts, function(err, stdout, stderr) {
    var code = err && err.code ? err.code : 0;
    if(conf.ps) {
      conf.ps.resume({infinite: true});
    }
    cb(err, {out: stdout, err: stderr, code: code});
  })
}

module.exports = exec;
