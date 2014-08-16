var util = require('util');

var CouchError = function(doc, res) {
  this.doc = doc;
  this.res = res;
  this.reason = doc.error;
  if(doc.reason && /^[a-z0-9_]+$/i.test(doc.reason)) {
    this.reason = doc.reason;
  }
  if(!this.reason) this.reason = 'unknown_db_error';
  this.status = res.statusCode;
  Error.call(this);
}

util.inherits(CouchError, Error);

CouchError.prototype.getErrorKey = function() {
  return 'E' + this.reason.toUpperCase();
}

module.exports = CouchError;
