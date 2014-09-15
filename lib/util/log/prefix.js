var util = require('util')
  , ansi = require('ttycolor').ansi;

  //console.log(ansi.color);

function prefixer(conf) {
  var scope = this;
  return function prefix(record, tty) {
    var conf = scope.configure().log;
    var fmt = conf.format || '%s |', nm = scope.name();
    if(!tty) {
      return util.format(fmt, nm);
    }
    return ansi(util.format(fmt, nm)).normal;
  }
}

module.exports = prefixer;
