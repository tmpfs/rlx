var feed = require('../../util/feed');

module.exports = function updates(info, req, next) {
  var log = this.log;
  var opts = req.db.options({qs: {feed: this.feed}});
  var dbh = req.db();
  var conn = dbh.updates(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
  })
  return feed.call(this, conn, opts, info, req, next);
}
