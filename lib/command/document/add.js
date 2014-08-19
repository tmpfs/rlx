var template = require('../../util/template');
var validate = require('../../util/validate');
var descriptor = require('cdb').schema.document;

module.exports = function add(info, req, next) {
  var errors = this.errors;
  var name = this.template || 'document/new';
  var opts = {db: this.database, id: this.id || req.vars.id};
  if(!opts.db) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  if(!opts.id) {
    return req.error(this.errors.EID_REQUIRED, req, next);
  }
  var dbh = req.db();
  template.list.call(this, req, function(err, list, unique) {
    if(err) return next(err);
    console.log(name);
    var tpl = template.find(name, unique);
    if(!tpl) {
      return req.error(errors.EUNKNOWN_TEMPLATE, req, next, [name]);
    }
    req.vars.id = opts.id;
    template.parse.call(this, tpl.file, req, function(err, doc) {
      if(err) return req.error(err);
      validate.call(this, doc, descriptor, function(errors, fields) {
        if(errors && errors.length) {
          return req.error(errors[0], req, next);
        }
        opts.id = doc._id;
        opts.body = doc;
        dbh.db.doc.save(opts, function(err, res, doc) {
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
