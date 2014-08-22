var feeds = require('cdb').feeds;

function feed(conn, opts, info, req, next) {
  var log = this.log, type = opts.qs.feed || feeds.continuous;
  conn.on('error', function(err) {
    req.error(err, req, next);
  })
  conn.on('response', function() {
    log.info('feed connection open %s (%s)', opts.server, type);
  })
  conn.on('data', function(data) {
    if(/^\r?\n$/.test('' + data)) return;
    var doc;
    try {
      if(type === feeds.eventsource) {
        data = ('' + data).trim().replace(/^data:\s+/, '');
      }
      doc = JSON.parse('' + data);
    }catch(e){
      console.dir('"' + data + '"');
      log.warn('failed to parse feed json \'%s\'', data);
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
