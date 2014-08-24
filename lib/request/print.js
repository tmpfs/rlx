var EOL = require('os').EOL;
var async = require('async');
var which = require('which');
var spawn = require('child_process').spawn;
var stringify = require('../util/stringify');
var write = require('../util/write');
var Readable = require('stream').Readable;

function highlight(doc, req, cb) {
  var cmds = Object.keys(req.rc.highlight);
  async.detectSeries(cmds, function(cmd, callback) {
    //console.log('check for which %s', cmd);
    which(cmd, function exists(err, path) {
      callback(!err && path);
    })
  }, function(result) {
    if(!result) return cb(doc);
    var cmd = result;
    var args = req.rc.highlight[result];
    //console.log('result %s', cmd);
    //console.log('args %s', args);
    cb(doc);
  })
}

function print(doc, req, next) {
  var isStream = (doc instanceof Readable);
  var indent = this.indent || 2;
  if(this.compress) indent = 0;
  var stream = req.stream || process.stdout, contents;
  if(!isStream) {
    contents = req.text ? doc : stringify(doc, indent);
  }
  if(!/\n$/.test(contents)) contents += EOL;
  delete req.text;
  if(this.output) {
    return write.call(this, isStream ? doc : contents, req, next);
  }
  var highlights = this.color !== false
    && (stream === process.stdout) && stream.isTTY;
  console.log('should highlight %s', highlights);
  highlight(contents, req, function(contents) {
    !isStream ? stream.write(contents) : doc.pipe(stream);
    if(!isStream) {
      next();
    }else{
      doc.once('end', function() {
        next();
      })
    }
  });
}

module.exports = print;
