var async = require('async');
var ansi = require('ttycolor').ansi;
var fs = require('fs');
var path = require('path');

function welcome(info, req, cb) {
  var scope = this
    , log = this.log
    , conf = this.configure();

  var prefix = this.name() + ' |';
  console.log(
    prefix
    + ' %s (interactive console), started on ' + conf.start.time,
    'v' + this.version());
  var names = this.commands().exit.names().slice(0);
  var last = names.pop();
  console.log(
    prefix
    + ' run %s | %s | %s for documentation, leave with %s or %s',
    this.commands().help.getLongName() + ' <cmd>', '--help', '?',
    names.join(', '), last);

  var files = [
    {
      message: 'rc init',
      file: path.join(req.dirs.user.home, req.runcontrol.name)
    },
    {
      message: 'tpl init',
      file: req.dirs.user.template
    }
  ]

  async.eachSeries(files, function(item, callback) {
    fs.exists(item.file, function(exists) {
      if(!exists) {
        log.warn('%s does not exist, run %s', item.file, item.message);
      }
      callback();
    })
  }, function(err, result) {
    cb.call(scope, err, result);
  })
}

module.exports = welcome;
