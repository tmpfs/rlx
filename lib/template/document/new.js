module.exports = function(req, cb) {
  var doc = {};
  if(this.id) {
    doc._id = this.id
    delete this.id;
  }
  for(var z in this) {
    doc[z] = this[z];
  }
  cb(null, doc);
}
