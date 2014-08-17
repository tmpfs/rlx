var assert = require('assert');
var fs = require('fs');
var spawn = require('child_process').spawn;

/**
 *  Encapsulates a request to edit a file.
 *
 *  @param options The request options.
 *  @param options.file The file to edit (required).
 *  @param options.editor The editor command to execute (required).
 *  @param options.args An array of arguments to pass to the editor command.
 *  @param options.opts Object of options used when spawning the editor child
 *  process.
 *  @param cb A callback function (required).
 */
function EditorRequest(options, cb) {
  var scope = this;
  options = options || {};
  var file = this.file = options.file;
  var editor = this.editor = options.editor || process.env.EDITOR;
  var args = this.args = options.args || [file];
  var opts = this.opts = options.opts || {stdio: 'inherit'};
  assert(file, 'editor request file must be specified')
  assert(editor, 'editor command must be specified')
  assert(Array.isArray(args), 'editor command arguments must be an array')
  assert(typeof cb === 'function', 'editor request callback must be a function');
  fs.exists(file, function(exists) {
    scope.exists = exists;
    if(exists) {
      fs.stat(file, function(err, stats) {
        if(err) return cb(err, scope);
        scope.stats = stats;
        cb(null, scope);
      });
    }else{
      cb(null, scope);
    }
  })
}

EditorRequest.prototype.spawn = function(cb) {
  var ps = spawn(this.editor, this.args, this.opts);
  if(typeof cb === 'function') {
    ps.once('exit', cb);
  }
  return ps;
}

module.exports = EditorRequest;
