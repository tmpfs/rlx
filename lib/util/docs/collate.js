var path = require('path');
var collators = require('./collator');

function collate(options, req, cb) {
  options = options || {};
  options.lang = options.lang || 'javascript';
  var rcauto = req.rc.docs && req.rc.docs.id ? req.rc.docs.id.auto : undefined;
  var rcflat = req.rc.docs ? req.rc.docs.flat : undefined;
  if(this.autoId !== undefined) rcauto = this.autoId;
  if(this.flat !== undefined) rcflat = this.flat;
  options.auto = rcauto !== undefined ? rcauto : true;
  options.flat = rcflat !== undefined ? rcflat : false;
  var clazz = collators[options.lang];
  if(!clazz) {
    return cb.call(this,
      this.wrap('unsupported document collation language %s', [lang]));
  }

  var collator = new clazz(options);
  if(typeof cb === 'function') collator.collate(this, cb);
  return collator;
}

module.exports = collate;
module.exports.collators = collators;
