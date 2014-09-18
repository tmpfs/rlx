var fs = require('fs');

/**
 *  Load user alias file if it exists.
 */
function load(req, cb) {
  var file = req.dirs.user.alias
    , aliases
    , conf = this.configure();

  // have to clear cache for reloads
  delete require.cache[file];

  fs.exists(file, function(exists) {
    // user has no aliases
    conf.alias = false;
    if(!exists) return cb();
    try {
      aliases = require(file);
    }catch(e) {
      return cb(e);
    }
    conf.alias = aliases;
    cb(null, aliases);
  });
}

module.exports = load;
