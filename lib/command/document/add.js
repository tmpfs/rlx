var template = require('../../util/template');
var validate = require('../../util/validate');
var descriptor = require('../../util/schema/document');

module.exports = function add(info, req, next) {
  var print = require('../../util/print').bind(this);
  var name = this.template || 'document/new';
  var opts = {db: this.database};
  if(!opts.db) {
    return req.error(this.errors.EDATABASE, next);
  }
  var dbh = req.db();
  template.list.call(this, req, function(err, list, unique) {
    if(err) return next(err);
    var tpl = template.find(name, unique);
    if(!tpl) {
      return next(errors.EUNKNOWN_TEMPLATE, [name]);
    }
    req.vars.id = this.id || req.vars.id;
    template.parse.call(this, tpl.file, req, function(err, doc) {
      if(err) return req.error(err);
      validate.call(this, doc, descriptor, function(errors, fields) {
        if(errors && errors.length) {
          return req.error(errors[0], next);
        }
        console.dir(doc);
        opts.id = doc._id;
        opts.body = doc;
        dbh.db.doc.save(opts, function(err, res, doc) {
          if(req.auth(info, req, err, dbh)) {
            return;
          }
          req.db.add(req, err, res, opts, doc);
          if(err) return req.error(err, next);
          print(doc, req, next);
        })
      })
    })
  })
}
