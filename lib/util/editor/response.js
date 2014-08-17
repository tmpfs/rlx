var assert = require('assert');
var EditorRequest = require('./request');
var info = require('./info');

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
  this.file = req.file;
  this.code = err && err.code ? err.code : 0;

  // if the request created a checksum
  // then we need to create a checksum after
  // the editor closed
  var hash = req.hash;
  var encoding = req.encoding;

  info.call(this, file, hash, encoding, cb);
}

/**
 *  Determine if the editor command succeeded.
 */
EditorResponse.prototype.success = function() {
  return !this.err || this.code === 0;
}

/**
 *  Determine if the file contents changed based upon checksum
 *  information in the request and response.
 */
EditorResponse.prototype.changed = function() {
  return this.req.checksum && this.checksum
    && this.req.checksum !== this.checksum;
}

/**
 *  Determine if the file being edited was written, ie
 *  the file modified time was changed.
 *
 *  This does not determine whether the file contents actually
 *  changed as a user could save the file with the exact same
 *  content.
 *
 *  If file checksum information is available then this method defers
 *  to changed() which will accurately determine if the file contents
 *  actually changed.
 */
EditorResponse.prototype.modified = function() {
  if(!this.req.exists && !this.exists) return false;
  if(this.req.checksum && this.checksum) {
    return this.changed();
  }
  if(this.req.stats && this.stats) {
    return this.stats.mtime.getTime() > this.req.stats.mtime.getTime()
  }
  return false;
}

module.exports = EditorResponse;
