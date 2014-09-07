var methods = require('cdb').methods
  , keys = Object.keys(methods);

module.exports = function rewrite(info, req, next) {
  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  if(!this.ddoc) {
    return req.error(this.errors.EDDOC_REQUIRED, req, next);
  }

  var path = info.args[0] || '', method = methods.get;
  if(~keys.indexOf(path.toLowerCase())) {
    method = methods[path.toLowerCase()];
    path = info.args[1] || '';
  }
  path = path.replace(/^\/+/, '');

  // TODO: validate path is not empty
  //console.log(path);
  var opts = req.db.options(
    req,
    {
      db: this.database,
      ddoc: this.ddoc,
      path: path,
      method: method
    }
  );
  var dbh = req.db();
  dbh.design.rewrite(opts, function(err, res, doc) {
    req.print(doc, req, next);
  })
}
