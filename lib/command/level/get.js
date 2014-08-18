var couch = require('../../util/couch');
var section = couch.sections.log;
var key = couch.sections.map.log.level;

module.exports = function get(info, req, next){
  var print = require('../../util/print').bind(this);
  var opts = {section: section, key: key};
  var dbh = req.db();
  dbh.config.get(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    var level = doc;
    doc = {
      level: level
    }
    print(doc, req, next);
  })
}
