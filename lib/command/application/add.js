var validate = require('../../util/validate');
var descriptor = require('cdb').schema.design;
var design = require('../../util/design');

module.exports = function add(info, req, next) {
  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  if(!this.id) {
    // TODO: use --id OR --ddoc error message
    return req.error(this.errors.EID_REQUIRED, req, next);
  }
  var errors = this.errors;
  var name = this.template || 'app';
  var opts = req.db.options(
    req, {db: this.database, id: this.id, ddoc: this.ddoc});
  var dbh = req.db();
  design.list.call(this, req, function(err, list, unique) {
    if(err) return next(err);
    var tpl = design.find(name, unique);
    if(!tpl) {
      return req.error(errors.EUNKNOWN_TEMPLATE, req, next, [name]);
    }
    design.collate.call(this, tpl, req, function(err, doc) {
      if(err) return req.error(err, req, next);
      validate.call(this, doc, descriptor, function(errors, fields) {
        if(errors && errors.length) {
          return req.error(errors[0], req, next);
        }
        // TODO: use shared prefix add/strip logic
        doc._id = '_design/' + this.id;
        opts.body = doc;
        dbh.design.save(opts, function(err, res, doc) {
          if(req.auth(info, req, err)) {
            return;
          }
          if(err) return req.error(err, req, next);
          req.print(doc, req, next);
        })
      })
    });
  })
}
