var assert = require('assert');
var fs = require('fs');
var EditorRequest = require('./request');

/**
 *  Encapsulates a response from the result of editing a file.
 *
 *  @param req The editor request object.
 *  @param err An error object received from the child process exit event.
 *  @param cb A callback function (required).
 */
function EditorResponse(req, err, cb) {
  var scope = this;
  var file = req.file;
  assert(
    req instanceof EditorRequest,
    'editor response requires an editor request')
  assert(typeof cb === 'function',
    'editor response callback must be a function');
  this.req = req;
  this.err = err;
  this.code = err && err.code ? err.code : 0;
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

/**
 *  Determine if the editor command succeeded.
 */
EditorResponse.prototype.success = function() {
  return !this.err || this.code === 0;
}

/**
 *  Determine if the file being edited was modified.
 */
EditorResponse.prototype.modified = function() {
  if(!this.req.exists && !this.exists) return false;
  if(this.req.stats && this.stats) {
    return this.stats.mtime.getTime() > this.req.stats.mtime.getTime()
  }
  return false;
}

module.exports = EditorResponse;
