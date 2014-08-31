var path = require('path');
var languages = {
  javascript: 'javascript'
}
var deflang = languages.javascript;

var collators = require('./collator');

function collate(tpl, req, cb) {
  var doc = null, lang;
  try {
    doc = require(path.join(tpl.file, 'index.json'));
  }catch(e) {
    return cb.call(this, e);
  }
  lang = doc.language || deflang;
  var clazz = collators[lang];
  if(!clazz) {
    return cb.call(this,
      this.wrap('unsupported design document language %s', [lang]));
  }

  var opts = {tpl: tpl, req: req, doc: doc, lang: lang};
  var collator = new clazz(opts);
  collator.collate(this, cb);
}

module.exports = collate;
