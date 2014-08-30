module.exports = function template(req, cb) {
  var docs = [];
  if(Array.isArray(this.docs) && this.docs.length) {
    docs = this.docs.map(function(value) {
      return {_id: value};
    });
  }
  var doc = {
    all_or_nothing: false,
    new_edits: true,
    docs: docs
  };
  cb(null, doc);
}
