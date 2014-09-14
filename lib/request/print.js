var EOL = require('os').EOL;
var async = require('async');
var which = require('which');
var spawn = require('child_process').spawn;
var stringify = require('../util/stringify');
var write = require('../util/write');
var Readable = require('stream').Readable;
var types = require('../util/types');

function highlight(type, doc, req, cb) {
  var log = this.log;
  //console.log('highlight type %s', type);
  if(type === 'javascript') type = 'js';
  var list = req.highlight[type];
  // TODO: handle unknown types
  //console.dir(req.highlight);
  if(!list) list = req.highlight.default;
  //console.dir(list);
  var cmds = Object.keys(list);
  async.detectSeries(cmds, function(cmd, callback) {
    which(cmd, function exists(err, path) {
      callback(!err && path);
    })
  }, function(result) {
    // no highlighter available
    if(!result) return cb(null, doc);
    var cmd = result;
    var args = list[result].split(' ');
    var out = new Buffer('');
    var err = new Buffer('');
    log.trace('%s %s', cmd, args.join(' '));
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
    var chunk;
    // write to ps stdin
    if((typeof doc === 'string') || (doc instanceof Buffer)) {
      ps.stdin.end(doc);
    }else if(doc instanceof Readable) {
      doc.on('readable', function() {
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
  var type = req.lang || types.json
    , conf = this.configure();
  // legacy
  if(req.text) type = types.text;
  //console.log('print %s %s', type, req.text);
  var isStream = (doc instanceof Readable);
  if(isStream) {
    type = types.getByExtension(doc.path, types.json);
  }
  var indent = this.indent || 2;
  if(this.compress) indent = 0;
  var stream = req.stream || process.stdout, contents;
  var convert = type === types.json;
  if(!isStream) {
    req.res = req.res || {};
    req.res.document = doc;
    contents = !convert ? doc : stringify(doc, null, indent);
    if(!/\n$/.test(contents)) contents += EOL;
  }
  var source = isStream ? doc : contents;
  if(this.output) {
    delete req.text;
    return write.call(this, source, req, next);
  }

  // printing has been suppressed for this execution
  if(conf.suppress) {
    conf.suppress = false;
    return next();
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
  var hasHighlightConfig = req.highlight &&
    req.highlight.json && req.highlight.js;
  var highlights = hasHighlightConfig && (this.color !== false
    && (stream === process.stdout) && stream.isTTY);
  //console.log('highlights: %s', highlights);
  if(req.text || !highlights) {
    run(null, req, next, source);
  }else{
      //console.log('highlighting %s', typeof contents);
    highlight.call(this, type, source, req, function(err, contents) {
      //console.log('got highlighted contents %s', contents);
      run(err, req, next, contents);
    });
  }
  delete req.text;
}

module.exports = print;
