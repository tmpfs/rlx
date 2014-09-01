module.exports = {
  map: function(doc) {
    emit(doc._id, null);
  },
  reduce: '_count'
}
