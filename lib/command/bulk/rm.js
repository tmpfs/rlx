var prompt = require('../../prompt');
var docs = require('../../util/docs');
module.exports = function rm(info, req, next) {
  var errors = this.errors
    , strict = this.strict;

  if(!this.database) {
    return req.error(errors.EDATABASE_REQUIRED, req, next);
  }

  if(!info.args.length) {
    return req.error(errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }

  var dbh = req.db();
  var opts = req.db.options(req, {});
  var revopts = {ids: info.args, lenient: this.lenient};

  prompt.rm.call(this, info, req, {id: info.args.length + ' doc(s)'},
    function(err, res) {
      if(err) return req.error(err, req, next);
      if(res.accept !== true) return next();
      docs.revs(revopts, info, req, function(err, doc) {
        if(err) return req.error(err, req, next);

        if(doc.err.length && strict) {
          return req.print(doc.err, req, next);
        }

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
          return req.print(doc.list, req, next);
        }

        dbh.db.bulk(opts, function(err, res, doc) {
          if(err) return req.error(err, req, next);
          req.print(doc, req, next);
        });
      })
    }
  )
}
