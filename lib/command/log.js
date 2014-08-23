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
      parser.on('message', function(msg) {
        if(!msg.raw) {
          req.print(msg, req, function(){});
        }
      })
      parser.once('end', function() {
        parser.removeAllListeners();
        next();
      })
      parser.end(new Buffer(doc));
    }
    req.print(doc, req, next);
  })
}
