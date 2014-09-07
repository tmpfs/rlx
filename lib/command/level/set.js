var couch = require('cdb');
var section = couch.sections.log;
var key = couch.sections.map.log.level;

module.exports = function set(info, req, next){
  var opts = req.db.options(req,
    {section: section, key: key, value: info.cmd.level});
  var dbh = req.db();
  dbh.config.set(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    var old = doc;
    doc = {
      level: info.cmd.level,
      before: old
    }
    req.print(doc, req, next);
  })
}
