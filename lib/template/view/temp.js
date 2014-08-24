module.exports = function template(req, cb) {
  var doc = {
    map: function(doc) {
      emit(doc._id, null);
    },
    reduce: '_count'
  }
  cb(null, doc);
}
