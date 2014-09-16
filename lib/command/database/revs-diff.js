var template = require('../../util/template');
var stringify = require('../../util/stringify');

module.exports = function revsdiff(info, req, next) {
  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  var errors = this.errors;
  var name = this.template || 'db/revmap';
  var opts = req.db.options(req, {db: this.database});
  var dbh = req.db();
  template.list.call(this, req, function(err, list, unique) {
    if(err) return req.error(err, req, next);
    var tpl = template.find(name, unique);
    if(!tpl) {
      return req.error(errors.EUNKNOWN_TEMPLATE, req, next, [name]);
    }
    template.parse.call(this, tpl.file, req, function(err, doc) {
      if(err) return req.error(err);
      opts.body = stringify(doc, null, 0);
      dbh.db.revsdiff(opts, function(err, res, doc) {
        if(err) return req.error(err, req, next);
        req.print(doc, req, next);
      })
    })
  })
}
