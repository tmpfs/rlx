var template = require('../../util/template');
var validate = require('../../util/validate');
var descriptor = require('cdb').schema.replicate;

module.exports = function start(info, req, next) {
  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  var errors = this.errors;
  var name = this.template || 'db/replicate';
  var opts = req.db.options(req, {db: this.database});
  if(!req.vars.source) {
    req.vars.source = this.database;
  }
  var dbh = req.db();
  template.list.call(this, req, function(err, list, unique) {
    if(err) return next(err);
    var tpl = template.find(name, unique);
    if(!tpl) {
      return req.error(errors.EUNKNOWN_TEMPLATE, req, next, [name]);
    }
    template.parse.call(this, tpl.file, req, function(err, doc) {
      if(err) return req.error(err);
      validate.call(this, doc, descriptor, function(errors, fields) {
        if(errors && errors.length) {
          return req.error(errors[0], req, next);
        }
        opts.body = doc;
        dbh.replicate(opts, function(err, res, doc) {
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
