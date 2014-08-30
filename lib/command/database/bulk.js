var template = require('../../util/template');
var validate = require('../../util/validate');
var descriptor = require('cdb').schema.bulk;
var stringify = require('../../util/stringify');

module.exports = function bulk(info, req, next) {
  var name = this.tpl || 'document/bulk';
  var opts = req.db.options(req, {db: this.database});
  if(!opts.db) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  var dbh = req.db();
  // TODO: open an editor with the template contents
  template.list.call(this, req, function(err, list, unique) {
    if(err) return req.error(err, req, next);
    var tpl = template.find(name, unique);
    if(!tpl) {
      return req.error(errors.EUNKNOWN_TEMPLATE, req, next, [name]);
    }
    template.parse.call(this, tpl.file, req, function(err, doc) {
      if(err) return req.error(err, req, next);
      validate.call(this, doc, descriptor, function(errors, fields) {
        if(errors && errors.length) {
          return req.error(errors[0], req, next);
        }
        opts.body = stringify(doc, null, 0);
        dbh.db.bulk(opts, function(err, res, doc) {
          if(req.auth(info, req, err)) {
            return;
          }
          if(err) return req.error(err, req, next);
          req.print(doc, req, next);
        })
      })
    })
  })
}
