var ansi = require('ttycolor').ansi;

function welcome(info, req, cb) {
  console.log(
    ansi('[' + this.name() + ']').normal.bg.black.valueOf(true)
      + ' %s (interactive console), started on ' + new Date(),
      this.version());

  var names = this.commands().exit.names().slice(0);
  var last = names.pop();
  console.log(
    ansi('[' + this.name() + ']').normal.bg.black.valueOf(true)
      + ' run %s for documentation, terminate session with %s or %s',
      this.commands().help.getLongName() + ' <cmd>',
      names.join(', '), last);
  cb.call(this, null);
}

module.exports = welcome;
