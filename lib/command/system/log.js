var util = require('util');
function pretty(log, record) {
  //var fmt = '[%s]i %s';
  //console.
  // should be using a console stream
  var cstream = log.streams[0].stream;
  cstream.write(record, log.name);
  //console.dir(log.streams);
}

module.exports = function log(info, req, next) {
  var records = this.configure().logbuffer.records.slice(0)
    , log = this.log
    , raw = this.raw;
  records.forEach(function(record) {
    record.id = log.names(record.level);
    if(Array.isArray(record.parameters)) {
      // remove the program prefix parameter
      record.parameters.shift();
    }
    if(raw) pretty(log, record);
  })
  if(!raw) {
    //return pretty.call(this, records, info, req, next);
    return req.print(records, req, next);
  }
  next();
}
