var docs = require('../../util/docs');
module.exports = function rm(info, req, next) {
  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }

  if(!info.args.length) {
    return req.error(
      this.errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }

  var dbh = req.db();
  var opts = req.db.options(req, {});
  var revopts = {ids: info.args, lenient: this.lenient};
  docs.revs(revopts, info, req, function(err, doc) {
    if(err) return req.error(err, req, next);
    var body = {docs: []}, k, v;
    for(k in doc.map) {
      v = doc.map[k];
      // ignore errors in revs response
      if(typeof v === 'string') {
        body.docs.push({_id: k, _rev: v, _deleted: true});
      }
    }
    opts.body = body;

    // likely no valid revisions were found
    if(!body.docs.length) {
      return req.print(doc.map, req, next);
    }
    dbh.db.bulk(opts, function(err, res, doc) {
      if(err) return req.error(err, req, next);
      req.print(doc, req, next);
    });
  })
}
