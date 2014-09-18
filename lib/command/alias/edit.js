var alias = require('../../util/alias');

module.exports = function edit(info, req, next) {
  var log = this.log
    , conf = this.configure()
    , doc = conf.alias;

  if(doc === false) {
    return req.error(
      this.errors.EALIAS_FILE_REQUIRED, req, next,
      [req.dirs.user.alias, 'alias init']);
  }

  var opts = {
    file: req.dirs.user.alias,
    hash: req.rc.edit.hash,
    body: doc
  };

  req.edit(info, req, next, opts, function(ereq, eres, edit) {
    var modified = eres.modified();
    if(!modified) {
      log.warn('no changes detected');

    // reload aliases in interactive mode
    }else if(conf.interactive) {
      return alias.load.call(this, req, function(err, aliases) {
        if(err) return req.error(err, req, next);
        next();
      })
    }
    next();
  });
}
