var pp = require('../../util/pp');

module.exports = function log(info, req, next) {
  var scope = this
    , records = this.configure().logbuffer.records.slice(0)
    , log = this.log
    , raw = this.raw
    , name = this.name();


  if(!raw) {
    return req.print(records, req, next);
  }else{
    records.forEach(function(record) {
      pp.conrec.call(scope, name, log, record);
    })
  }

  next();
}
