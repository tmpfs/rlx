module.exports = function log(info, req, next) {
  var records = this.configure().logbuffer.records.slice(0);
  records.forEach(function(record) {
    if(Array.isArray(record.parameters)) {
      // remove the program prefix parameter
      record.parameters.shift();
    }
  })
  req.print(records, req, next);
}
