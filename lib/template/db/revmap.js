module.exports = function template(req, cb) {
  var doc = {};
  for(var z in this) {
    doc[z] = Array.isArray(this[z]) ? this[z] : [this[z]];
  }
  cb(null, doc);
}
