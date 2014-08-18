var userdb = require('./userdb');
var template = require('../../util/template');
var validate = require('../../util/validate');
var descriptor = require('../../util/schema/user');

module.exports = function add(info, req, next) {
  var print = require('../../util/print').bind(this);
  var name = this.template || 'user/new';
  //console.log('add called');
  template.list.call(this, req, function(err, list, unique) {
    if(err) return next(err);
    var tpl = template.find(name, unique);
    if(!tpl) {
      return next(errors.EUNKNOWN_TEMPLATE, [name]);
    }
    req.vars.name = userdb.strip(this.username || req.vars.name);
    req.vars.id = userdb.id(req.vars.name);
    req.vars.password = this.password || req.vars.password;
    req.vars.roles = req.vars.roles || [];
    validate.call(this, req.vars, descriptor, function(errors, fields) {
      if(errors && errors.length) {
        return req.error(errors[0], next);
      }
      template.parse.call(this, tpl.file, req, function(err, doc) {
        print(doc, req, next);
      });
    });
  })
}
