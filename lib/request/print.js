var EOL = require('os').EOL;
var async = require('async');
var which = require('which');
var spawn = require('child_process').spawn;
var stringify = require('../util/stringify');
var write = require('../util/write');
var Readable = require('stream').Readable;
var types = require('../util/types');

function highlight(type, doc, req, cb) {
  //console.log('highlight type %s', type);
  var cmds = Object.keys(req.rc.highlight[type]);
  async.detectSeries(cmds, function(cmd, callback) {
    which(cmd, function exists(err, path) {
      callback(!err && path);
    })
  }, function(result) {
    // no highlighter available
    if(!result) return cb(null, doc);
    var cmd = result;
    var args = req.rc.highlight[type][result].split(' ');
    var out = new Buffer('');
    var err = new Buffer('');
    var ps = spawn(cmd, args);
    ps.stderr.on('data', function ondata(chunk) {
      err = Buffer.concat([err, chunk]);
    })
    ps.stdout.on('data', function ondata(chunk) {
      out = Buffer.concat([out, chunk]);
    })
    ps.once('close', function onclose(code) {
      ps.removeAllListeners();
      var ok = code === 0, e;
      if(!ok) {
        e = new Error('document highlight failed');
        e.code = code;
        e.cmd = cmd;
        e.args = args;
        e.stdout = out;
        e.stderr = err;
        e.source = doc;
      }
      cb(e, out);
    })
    // write to ps stdin
    if((typeof doc === 'string') || (doc instanceof Buffer)) {
      ps.stdin.end(doc);
    }else if(doc instanceof Readable) {
      doc.on('readable', function() {
        var chunk;
        while (null !== (chunk = doc.read())) {
          ps.stdin.write(chunk);
        }
        ps.stdin.end();
      });
    }else{
      ps.removeAllListeners();
      cb(null, doc);
    }
  })
}

function print(doc, req, next) {
  var type = types.json;
  var isStream = (doc instanceof Readable);
  if(isStream) {
    type = types.getByExtension(doc.path, types.json);
  }
  var indent = this.indent || 2;
  if(this.compress) indent = 0;
  var stream = req.stream || process.stdout, contents;
  var plain = req.text || (type === types.text);
  if(!isStream) {
    contents = plain ? doc : stringify(doc, null, indent);
    if(!/\n$/.test(contents)) contents += EOL;
  }
  var source = isStream ? doc : contents;
  delete req.text;
  if(this.output) {
    return write.call(this, source, req, next);
  }

  function run(err, req, next, contents) {
    if(err) return req.error(err, req, next);
    var isStream = (contents instanceof Readable);
    if(isStream) {
      contents.pipe(stream);
      contents.once('end', function() {
        next();
      })
    }else{
      stream.write(contents);
      next();
    }
  }
  var hasHighlightConfig = req.rc.highlight &&
    req.rc.highlight.json && req.rc.highlight.js;
  var highlights = hasHighlightConfig && !plain && (this.color !== false
    && (stream === process.stdout) && stream.isTTY);
  //console.log('highlights: %s', highlights);
  if(!highlights) {
    run(null, req, next, source);
  }else{
    highlight(type, source, req, function(err, contents) {
      run(err, req, next, contents);
    });
  }
}

module.exports = print;
