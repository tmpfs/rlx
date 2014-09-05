function save(options, req, cb) {
  options = options || {};
  var list = options.list || [];
  var bulk = options.bulk === undefined ? true : options.bulk;
  //console.dir(list);
  cb(null, list);
}

module.exports = save;
