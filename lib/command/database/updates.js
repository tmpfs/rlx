module.exports = function updates(info, req, next) {
  var opts = req.db.options();
  var dbh = req.db();
  var conn = dbh.updates(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
  conn.on('data', function(data) {
    //console.log('got data %s', data);
    try {
      doc = JSON.parse('' + data);
    }catch(e){
      //TODO: warn
    }
    if(doc) {
      req.print(doc, req, function() {
        // TODO
      });
    }
  })
}
