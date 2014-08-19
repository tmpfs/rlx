var couch = require('cdb');
var section = couch.sections.log;
var key = couch.sections.map.log.level;

module.exports = function set(info, req, next){
  var opts = {section: section, key: key, value: info.cmd.level};
  var dbh = req.db();
  dbh.config.set(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    var old = doc;
    doc = {
      level: info.cmd.level,
      previous: old
    }
    req.print(doc, req, next);
  })
}
