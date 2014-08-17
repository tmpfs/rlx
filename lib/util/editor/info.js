var fs = require('fs');
var crypto = require('crypto');

/**
 *  Retrieve information about a file.
 *
 *  Used by the editor request and response to gather
 *  information about the file such as whether it exists,
 *  a stats object and potentially a checksum.
 *
 *  Should be invoked in the scope of the caller.
 */
function info(file, hash, encoding, cb) {
  var scope = this;
  fs.exists(file, function(exists) {
    scope.exists = exists;
    if(exists) {
      fs.stat(file, function(err, stats) {
        if(err) return cb(err, scope);
        scope.stats = stats;
        if(hash) {
          var checksum;
          try{
            checksum = crypto.createHash(hash);
          }catch(e) {
            return cb(e, scope);
          }
          var stream = fs.ReadStream(file);
          stream.on('error', function(err) {
            stream.removeAllListeners();
            cb(err, scope);
          })
          stream.on('data', function(data) {
            checksum.update(data);
          })
          stream.on('end', function() {
            stream.removeAllListeners();
            scope.checksum = checksum.digest(encoding);
            cb(null, scope);
          })
        }else{
          cb(null, scope);
        }
      });
    }else{
      cb(null, scope);
    }
  })
}

module.exports = info;
