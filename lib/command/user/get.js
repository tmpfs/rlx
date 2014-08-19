var userdb = require('./userdb');

module.exports = function get(info, req, next) {
  var print = require('../../util/print').bind(this);

  var opts = {db: this.database || userdb.default, id: this.id};
  if(!opts.id) {
    return req.error(this.errors.EID, next);
  }
  opts.id = userdb.id(opts.id);
  if(this.rev) {
    //override parsed query string
    req.query.id.rev = this.rev;
  }
  opts.qs = req.query.id;

  var dbh = req.db();
  dbh.db.doc.get(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    if(err) return req.error(err, req, next);
    print(doc, req, next);
  })
}
