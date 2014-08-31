var tasktypes = require('cdb').tasktypes;

module.exports = function ls(info, req, next) {
  var opts = req.db.options(req);
  var dbh = req.db();
  dbh.tasks(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    if(Array.isArray(doc) && doc.length) {
      doc = doc.filter(function(value) {
        if(value && value.type === tasktypes.replication) {
          return value;
        }
      })
    }
    req.print(doc, req, next);
  })
}
