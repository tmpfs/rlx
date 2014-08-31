function find(doc, args) {
  var o = null, t = doc;
  for(var i = 0;i < args.length;i++) {
    if(t[args[i]]) {
      t = t[args[i]];
    }
    if(i === args.length - 1) o = t;
  }
  return o;
}

module.exports = function get(info, req, next, cb) {
  var scope = this;
  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  if(!this.id) {
    return req.error(this.errors.EID_REQUIRED, req, next);
  }
  var opts = req.db.options(
    req, {db: this.database, id: this.id, ddoc: this.ddoc});
  var dbh = req.db();
  var args = info.args.slice(0);
  dbh.doc.get(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    var sub;
    if(err) return req.error(err, req, next);
    if(args.length) {
      sub = find(doc, args);
    }
    //console.log('got doc %j', doc);
    if(typeof cb === 'function') return cb.call(scope, doc, sub);
    req.print(sub ? sub : doc, req, next);
  })
}
