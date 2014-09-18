var fs = require('fs');

/**
 *  Load user alias file if it exists.
 */
function load(req, cb) {
  var file = req.dirs.user.alias
    , aliases = null
    , log = this.log
    , conf = this.configure();

  // have to clear cache for reloads
  if(conf.interactive) {
    delete require.cache[file];
  }

  fs.exists(file, function(exists) {
    // user has no aliases
    conf.alias = false;
    if(!exists) return cb();
    try {
      aliases = require(file);
    }catch(e) {
      log.error('malformed file %s, aliases unavailable', file);
    }
    conf.alias = aliases;
    cb(null, aliases);
  });
}

module.exports = load;
