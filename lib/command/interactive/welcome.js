var ansi = require('ttycolor').ansi;

function welcome(info, req, cb) {
  console.log(
    ansi('[' + this.name() + ']').normal.bg.black.valueOf(true)
      + ' %s (interactive console), started on ' + new Date(),
      this.version());

  var prefix = ansi('[' + this.name() + ']').normal.bg.black.valueOf(true);
  var names = this.commands().exit.names().slice(0);
  var last = names.pop();
  console.log(
      prefix
      + ' run %s | %s | %s for documentation, terminate session with %s or %s',
      this.commands().help.getLongName() + ' <cmd>', '--help', '?',
      names.join(', '), last);
  cb.call(this, null);
}

module.exports = welcome;
