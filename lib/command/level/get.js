var couch = require('cdb');
var section = couch.sections.log;
var key = couch.sections.map.log.level;

module.exports = function get(info, req, next){
  var opts = req.db.options(req, {section: section, key: key});
  var dbh = req.db();
  dbh.config.get(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    var level = doc;
    doc = {
      level: level
    }
    req.print(doc, req, next);
  })
}
