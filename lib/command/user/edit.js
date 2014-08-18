var userdb = require('./userdb');
var qs = require('../../util/couch').querystring;
var temp = require('../../util/temp');

module.exports = function edit(info, req, next) {
  var print = require('../../util/print').bind(this);
  var id = this.id || this.username;
  var rev = this.rev;
  var opts = {db: this.database || userdb.default};
  if(!id) {
    return next(this.errors.EID_USERNAME_OPTION);
  }
  id = userdb.id(id);
  opts.id = id;
  if(rev) {
    opts.qs = qs.stringify({
      rev: rev
    });
  }
  req.db().db.doc.get(opts, function(err, res, doc) {
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    temp.create.call(this, req, {body: doc}, function(err, file) {
      print(doc, req, next);
    })
  })
}
