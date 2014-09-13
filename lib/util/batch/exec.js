/**
 *  Execute a series of batch files.
 */
function exec(opts, cb) {
  if(typeof opts === 'function') {
    cb = opts;
    opts = null;
  }
  opts = opts || {};
  cb();
}

module.exports = exec;
