function revs(options, info, req, cb) {
  var scope = this, log = this.log;
  var dbh = req.db();
  options = options || {};
  var opts = req.db.options(req, {qs: {keys: options.ids || []}});
  dbh.db.all(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return cb(err);
    var rows = doc.rows || []
      , row, id, rev, item, list = [], map = {}, revs = []
      , err = [];
    for(var i = 0;i < rows.length;i++) {
      row = rows[i];
      id = row.id;
      if(id && row.value) {
        item = {id: id, rev: row.value.rev};
        list.push(item);
        map[id] = item.rev;
        revs.push(item.rev);
      }else{
        if(!options.lenient) {
          list.push(row);
          map[row.key] = row;
        }
        err.push(row);
      }
    }
    cb(null, {result: doc, list: list, map: map, revs: revs, err: err});
  })
}

module.exports = revs;
