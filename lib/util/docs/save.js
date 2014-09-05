function save(options, req, cb) {
  options = options || {};
  var dbh = req.db();
  var opts = req.db.options(req, {});
  var list = options.list || [];
  var bulk = options.bulk === undefined ? true : options.bulk;
  //console.dir(opts);
  var body = {docs: []}, fo;
  for(var i = 0;i < list.length;i++) {
    fo = list[i];
    if(fo && fo.document) {
      body.docs.push(fo.document);
    }
  }
  opts.body = body;
  dbh.db.bulk(opts, function(err, res, doc) {
    //console.dir('got bulk docs response');
    //console.dir(doc);
    cb(null, doc);
  });
}

module.exports = save;
