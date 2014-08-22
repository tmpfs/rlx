var feed = require('../../util/feed');
var feeds = require('cdb').feeds;

module.exports = function updates(info, req, next) {
  var log = this.log, type = this.feed;
  var opts = req.db.options({qs: {feed: type}});
  var dbh = req.db();
  var conn = dbh.updates(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    //console.log('got res');
    if(type === feeds.longpoll) {
      next();
    }
  })
  return feed.call(this, conn, opts, info, req, next);
}
