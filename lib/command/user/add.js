var userdb = require('./userdb');
var template = require('../../util/template');
var validate = require('../../util/validate');
var descriptor = require('cdb').schema.user;

module.exports = function add(info, req, next) {
  var id = this.id;
  var name = this.tpl || 'user/new';
  var opts = req.db.options(req, {db: this.database || userdb.default});
  var dbh = req.db();
  template.list.call(this, req, function(err, list, unique) {
    if(err) return req.error(err, req, next);
    var tpl = template.find(name, unique);
    if(!tpl) {
      return req.error(errors.EUNKNOWN_TEMPLATE, req, next, [name]);
    }
    req.vars.name = userdb.strip(id || req.vars.name || info.args[0]);
    req.vars.id = userdb.id(req.vars.name);
    req.vars.password = req.vars.password || info.args[1];
    req.vars.roles = req.vars.roles || [];
    template.parse.call(this, tpl.file, req, function(err, doc) {
      if(err) return req.error(err, req, next);
      validate.call(this, doc, descriptor, function(errors, fields) {
        if(errors && errors.length) {
          return req.error(errors[0], req, next);
        }
        opts.id = doc._id;
        opts.body = doc;
        dbh.doc.save(opts, function(err, res, doc) {
          if(err) return req.error(err, req, next);
          req.print(doc, req, next);
        })
      })
    })
  })
}
