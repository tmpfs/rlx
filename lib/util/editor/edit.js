var assert = require('assert');
var EditorRequest = require('./request');
var EditorResponse = require('./response');

function Edit(req, cb) {
  var scope = this;
  assert(
    req instanceof EditorRequest,
    'edit requires an editor request')
  assert(typeof cb === 'function',
    'edit callback must be a function');

  process.stdin.pause();
  var ps = req.spawn(function(err) {
    var res = new EditorResponse(req, err, function(err, res) {
      process.stdin.resume();
      cb(err, req, res, scope);
    });
  });
}

module.exports = Edit;
