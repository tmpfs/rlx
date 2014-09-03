var list = require('./list')
  , find = require('./find')
  , collate = require('./collate');

function get(name, info, req, cb) {
  var errors = this.errors, wrap = this.wrap;
  name = name.replace(/^design\//, '');
  list.call(this, req, function(err, list, unique) {
    if(err) return cb(err);
    tpl = find(name, unique);
    if(!tpl) {
      return cb(wrap(errors.EUNKNOWN_TEMPLATE, [name]));
    }
    collate.call(this, tpl, req, function(err, result) {
      cb.call(this, err, result);
    })
  })
}

module.exports = get;
