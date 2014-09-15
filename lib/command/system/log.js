var pp = require('../../util/pp');

module.exports = function log(info, req, next) {
  var scope = this
    , records = this.configure().logbuffer.records.slice(0)
    , log = this.log
    , raw = this.raw
    , name = this.name();

  records.forEach(function(record) {
    record.id = log.names(record.level);
    if(raw) pp.conrec.call(scope, name, log, record);
  })

  if(!raw) {
    return req.print(records, req, next);
  }

  next();
}
