var fs = require('fs');
var path = require('path');
var uuid = require('uuid');
var stringify = require('./stringify');
var ftypes = require('./types');

var types = {
  file: 'file',
  dir: 'dir'
}

var cache = {};

function filepath(req, id) {
  var dir = req.dirs.tmp;
  id = id || uuid();
  return path.join(dir, id);
}

/**
 *  Create a temporary file.
 */
function create(req, options, cb) {
  var scope = this;
  var id = options.file ? path.basename(options.file) : uuid();
  var file = options.file || filepath(req, id);
  if(!options.file && options.type) {
    file += '.' + options.type;
  }
  var body = options.body || '';
  if(body && typeof body !== 'string' && options.type === ftypes.JSON) {
    body = stringify(body, null, this.indent || 2);
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
module.exports.filepath = filepath;
