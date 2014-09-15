var util = require('util')
  , ttycolor = require('ttycolor')
  , ansi = ttycolor.ansi
  , keys = ttycolor.map;

function prefixer(conf) {
  var scope = this
    , nm = this.name();

  return function prefix(record, tty) {
    var fmt = '%s |';
    if(!tty) {
      return util.format(fmt, nm);
    }
    var color = keys.normal;
    var id = this.names(record.level);
    switch(id) {
      case 'error':
        color = keys.red;
        break;
      case 'warn':
        color = keys.magenta;
        break;
    }
    var conf = scope.configure().log;
    return ansi(util.format(fmt, nm))[color];
  }
}

module.exports = prefixer;
