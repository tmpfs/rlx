var revs = require('./revs');

function get(options, info, req, cb) {
  var scope = this;
  options = options || {};
  options.qs = options.qs || {};
  options.qs.include_docs = true;
  revs.call(scope, options, info, req, function(err, doc) {
    if(err) return cb(err);
    if(options.strict && doc.err.length) {
      return cb(null, doc);
    }
    var i, row, docs = [];
    if(doc.result && doc.result.rows) {
      for(i = 0;i < doc.result.rows.length;i++) {
        row = doc.result.rows[i];
        if(row.id && row.doc) {
          docs.push(row.doc);
        }
      }
    }

    cb(null, {revs: doc, docs: docs});
  })
}

module.exports = get;
