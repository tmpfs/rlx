module.exports = function template(req, cb) {
  var doc = {};
  doc.source = this.source;
  doc.target = this.target;
  doc.continuous = this.continuous;
  doc.cancel = this.cancel;
  doc.create_target = this.create_target;
  doc.proxy = this.proxy;
  doc.doc_ids = Array.isArray(this.doc_ids) ? this.doc_ids : undefined;
  cb(null, doc);
}
