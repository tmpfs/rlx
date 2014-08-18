var fs = require('fs');
var path = require('path');
var circular = require('circular');
var uuid = require('uuid');

var types = {
  file: 'file',
  dir: 'dir'
}

var cache = {};

/**
 *  Create a temporary file.
 */
function create(req, options, cb) {
  var scope = this;
  var dir = req.dirs.tmp;
  var id = uuid();
  var file = path.join(dir, id);
  if(options.type) {
    file += '.' + options.type;
  }
  var body = options.body || '';
  if(body && typeof body !== 'string') {
    body = JSON.stringify(body, circular(), this.indent || 2);
  }
  fs.writeFile(file, body, function(err) {
    if(err) return cb.call(scope, err);
    cache[id] = {file: file, type: types.file};
    cb.call(scope, null, file, body);
  });
}

/**
 *  Remove temp files and directories.
 *
 *  Must be synchronous as can be called in exit hook.
 */
function cleanup() {
  var k, item, file;
  for(k in cache) {
    item = cache[k];
    file = item.file;
    if(item.type === types.file) {
      try {
        fs.unlinkSync(file);
        delete cache[k];
      }catch(e){
        console.error(e.message);
      }
    }
  }
}

process.on('exit', function(code) {
  cleanup();
})

function exit() {
  // highest possible exit code on POSIX
  process.exit(255);
}

process.once('SIGINT', exit).once('SIGTERM', exit);

module.exports.create = create;
module.exports.cache = cache;
module.exports.cleanup = cleanup;
