var LogParse = require('couchdb-log-parse')
var parser = new LogParse()

module.exports = function log(info, req, next) {
  var raw = this.raw, log = this.log;
  var opts = req.db.options({qs: {}});
  if(this.offset) opts.qs.offset = this.offset;
  if(this.bytes) opts.qs.bytes = this.bytes;
  var dbh = req.db();
  dbh.tail(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    req.text = raw;
    if(err) return req.error(err, req, next);
    if(!raw) {
      var records = [];
      parser.on('message', function(msg) {
        // TODO: warn on invalid log record
        if(!msg.raw) {
          records.push(msg);
        }
      })
      parser.once('end', function() {
        parser.removeAllListeners();
        //console.log('got records %j', records);
        req.print(records, req, next);
      })
      parser.end(new Buffer(doc));
    }else{
      req.print(doc, req, next);
    }
  })
}
