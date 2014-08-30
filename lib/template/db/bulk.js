module.exports = function template(req, cb) {
  var docs = [], doc;
  if(Array.isArray(this.docs) && this.docs.length) {
    docs = this.docs.map(function(value) {
      return {_id: value};
    });
  }
  if(this.files) {
    this.files.forEach(function(item) {
      doc = item.doc;
      if(doc) {
        if(Array.isArray(doc)) {
          doc = {
            list: doc
          }
        }else if(typeof doc === 'function') {
          doc = {map: '' + doc.toString()};
        }
        //console.dir(doc);
        docs.push(doc);
      }
    })
  }
  var doc = {
    all_or_nothing: false,
    new_edits: true,
    docs: docs
  };
  cb(null, doc);
}
