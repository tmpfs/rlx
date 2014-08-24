var EOL = require('os').EOL;
var async = require('async');
var which = require('which');
var spawn = require('child_process').spawn;
var stringify = require('../util/stringify');
var write = require('../util/write');
var Readable = require('stream').Readable;

function highlight(doc, req, cb) {
  //var isStream = (doc instanceof Readable);
  var cmds = Object.keys(req.rc.highlight);
  async.detectSeries(cmds, function(cmd, callback) {
    which(cmd, function exists(err, path) {
      callback(!err && path);
    })
  }, function(result) {
    // no highlighter available
    if(!result) return cb(null, doc);
    var cmd = result;
    var args = req.rc.highlight[result].split(' ');
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
      //console.log('got close event')
      ps.removeAllListeners();
      var ok = code === 0, e;
      //console.log('code %s', code)
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
      //console.log('pipe');
      //doc.pipe(ps.stdin);
      //ps.stdin.pipe(doc);
      //
      doc.on('readable', function() {
        //console.log('doc is readable');
        var chunk;
        while (null !== (chunk = doc.read())) {
          //console.log('got %d bytes of data', chunk.length);
          ps.stdin.write(chunk);
        }
        //console.log('after loop');
        ps.stdin.end();
        //if(chunk !== null) {
          //console.log('write chunk');
        //}
      });
    }else{
      ps.removeAllListeners();
      cb(null, doc);
    }
  })
}

function print(doc, req, next) {
  var isStream = (doc instanceof Readable);
  var indent = this.indent || 2;
  if(this.compress) indent = 0;
  var stream = req.stream || process.stdout, contents;
  var plain = req.text;
  if(!isStream) {
    contents = plain ? doc : stringify(doc, indent);
  }
  if(!/\n$/.test(contents)) contents += EOL;
  delete req.text;
  if(this.output) {
    return write.call(this, isStream ? doc : contents, req, next);
  }

  function run(err, req, next, contents) {
    if(err) return req.error(err, req, next);
    var isStream = (contents instanceof Readable);
    if(isStream) {
      contents.pipe(stream);
      doc.once('end', function() {
        next();
      })
    }else{
      stream.write(contents);
      next();
    }
  }

  var highlights = !plain && (this.color !== false
    && (stream === process.stdout) && stream.isTTY);
  //console.log('highlights: %s', highlights);
  if(!highlights) {
    run(null, req, next, contents);
  }else{
    highlight(isStream ? doc : contents, req, function(err, contents) {
      run(err, req, next, contents);
    });
  }
}

module.exports = print;
