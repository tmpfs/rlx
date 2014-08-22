function feed(conn, opts, info, req, next) {
  var log = this.log;
  conn.on('error', function(err) {
    req.error(err, req, next);
  })
  conn.on('close', function() {
    log.info('feed connection closed %s', opts.server);
    next();
  })
  conn.on('response', function() {
    log.info('feed connection open %s', opts.server);
  })
  conn.on('data', function(data) {
    if(/^\r?\n$/.test('' + data)) return;
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
  return conn;
}

module.exports = feed;
