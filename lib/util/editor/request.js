var assert = require('assert');
var fs = require('fs');
var spawn = require('child_process').spawn;
var info = require('./info');

/**
 *  Encapsulates a request to edit a file.
 *
 *  @param options The request options.
 *  @param options.file The file to edit (required).
 *  @param options.editor The editor command to execute (required).
 *  @param options.args An array of arguments to pass to the editor command.
 *  @param options.body A string or buffer to write to the file before creating
 *  a hash or editing the file.
 *  @param options.opts Object of options used when spawning the editor child
 *  process.
 *  @param options.hash Create a hash of the file contents, if the file does
 *  not exist then no hash is created. The value should be a string hash
 *  algorithm, eg: sha1.
 *  @param cb A callback function (required).
 */
function EditorRequest(options, cb) {
  var scope = this;
  options = options || {};
  var file = this.file = options.file;
  var ed = /^win/.test(process.platform) ? 'notepad' : 'vim';
  var editor = this.editor = options.editor
    || process.env.VISUAL || process.env.EDITOR || ed;
  //console.log(this.editor);
  var args = this.args = options.args || [];
  this.args = args.concat(file);
  var opts = this.opts = options.opts || {stdio: 'inherit'};
  var hash = this.hash = options.hash;
  var encoding = this.encoding = options.encoding || 'hex';
  assert(file, 'editor request file must be specified')
  assert(editor, 'editor command must be specified')
  assert(Array.isArray(args), 'editor command arguments must be an array')
  assert(typeof cb === 'function', 'editor request callback must be a function');
  //console.log('got options body %s', options.body);
  if(options.body
    && (typeof(options.body) === 'string'
      || (options.body instanceof Buffer))) {
    //console.error('writing file %s', options.body);
    fs.writeFile(file, options.body, function(err) {
      if(err) return cb.call(scope, err);
      //console.log('file written!!! %s', options.body);
      info.call(scope, file, hash, encoding, cb);
    })
  }else{
    info.call(this, file, hash, encoding, cb);
  }
}

EditorRequest.prototype.spawn = function(cb) {
  var args = this.editor.split(/\s+/).concat(this.args);
  var bin = args.shift();
  var ps = spawn(bin, args, this.opts);
  if(typeof cb === 'function') {
    ps.once('exit', cb);
  }
  return ps;
}

module.exports = EditorRequest;
