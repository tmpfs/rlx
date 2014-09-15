var fsutil = require('cli-command').fs;
var request = require('./request');
var utils = require('cli-util')
  , repeat = utils.repeat;

module.exports = function boot(req, next) {

  var conf = this.configure()
    , dbh
    , log = this.log;

  req.error = request.error.bind(this);

  var home = fsutil.home();
  if(!home) {
    return req.error(this.errors.EHOME, req, next);
  }

  // configure directory information
  request.dirs.call(this, req, home);

  // request decoration functions
  req.auth = request.auth.bind(this);
  req.hasCredentials = request.auth.hasCredentials.bind(this);
  req.isAuthenticated = request.auth.isAuthenticated.bind(this);

  req.db = request.db.bind(this);
  req.db.options = request.db.options.bind(this);
  req.edit = request.edit.bind(this);
  req.print = request.print.bind(this);

  var prefixer = require('./util/log/prefix');
  log.conf.prefix = prefixer.call(this);

  dbh = req.db();

  function onrecord(level, record, target, message, parameters) {
    record.id = log.names(record.level);
  }

  if(!log.listeners('record').length) {
    log.on('record', onrecord);
  }

  if(!dbh.log.listeners('record').length) {
    dbh.log.on('record', onrecord);
  }

  if(!log.listeners('flush').length) {
    log.on('flush',
      function onflush(level, record, target, message, parameters) {
        if(target.isConsole && record.err && record.err.stack && conf.trace) {
          var prefix = log.conf.prefix.apply(log, [record, process.stderr.isTTY]);
          var lines = typeof record.err.stack === 'string'
            ? lines.split('\n') :
              Array.isArray(record.err.stack) ? record.err.stack : [];
          lines = lines.map(function(line) {
            return repeat(2) + line;
          })
          target.stream.write(record, prefix, lines.join('\n'), []);
        }
      }
    )
  }
  next();
}
