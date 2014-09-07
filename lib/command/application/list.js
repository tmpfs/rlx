module.exports = function list(info, req, next) {
  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  if(!this.ddoc) {
    return req.error(this.errors.EDDOC_REQUIRED, req, next);
  }
  if(!this.nm) {
    return req.error(this.errors.ENAME_REQUIRED, req, next);
  }

  var oddoc, view = info.args[0], ind = view.indexOf('/');
  if(view && ind > -1) {
    oddoc = view.substr(0, ind);
    view = view.substr(ind + 1);
  }

  var opts = req.db.options(
    req,
    {
      db: this.database,
      id: this.id,
      ddoc: this.ddoc,
      name: this.nm,
      oddoc: oddoc,
      view: view
    }
  );
  var dbh = req.db();
  dbh.design.list(opts, function(err, res, doc) {
    req.print(doc, req, next);
  })
}
