var feed = require('../../util/feed');
var feeds = require('cdb').feeds;

module.exports = function updates(info, req, next) {
  var log = this.log;
  var opts = req.db.options(req, {qs: {feed: this.feed}});
  var dbh = req.db();
  var conn = dbh.updates(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    log.info('feed connection closed %s', opts.server);
    next();
  })
  return feed.call(this, conn, opts, info, req, next);
}
