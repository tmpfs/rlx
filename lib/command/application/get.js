var dget = require('../document/get');
var design = require('../../util/design');

module.exports = function get(info, req, next) {
  dget.call(this, info, req, next, function(doc, sub) {
    var lang = doc.language || design.collators.default;
    if(sub) {
      if(typeof sub === 'string') {
        console.log('print sub string %s %s', lang, design.collators.default);
        req.lang = lang;
        req.print(sub, req, next);
      }else{
        req.print(sub, req, next);
      }
    }else{
      req.print(doc, req, next);
    }
  });
}
