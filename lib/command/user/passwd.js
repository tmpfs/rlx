var userdb = require('./userdb');
var qs = require('../../util/couch').querystring;

module.exports = function passwd(info, req, next) {
  var print = require('../../util/print').bind(this);
  var id = this.id || this.username;
  var password = this.password;
  var rev = this.rev;
  var opts = {db: this.database || userdb.default};
  if(!id) {
    return next(this.errors.EID_USERNAME_OPTION);
  }
  if(!password) {
    return next(this.errors.EPASSWORD_REQUIRED);
  }
  id = userdb.id(id);
  opts.id = id;
  if(rev) {
    opts.qs = qs.stringify({
      rev: rev
    });
  }
  var dbh = req.db();
  req.db().db.doc.get(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    doc.password = password;
    opts.body = doc;
    dbh.db.doc.save(opts, function(err, res, doc) {
      req.db.add(req, err, res, opts, doc);
      if(err) return req.error(err, next);
      print(doc, req, next);
    })
  })
}
