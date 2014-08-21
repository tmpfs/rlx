//process.env.CLI_TOOLKIT_DEBUG=true;

var path = require('path');

var util = require('util');
var circular = require('circular');
var glue = require('cli-interface');
var cli = require('cli-command'), help = cli.help;
var rc = require('cli-rc');
var logger = require('cli-logger');
var CommandInterface = glue.CommandInterface;

var boot = require('./boot');
var ready = require('./ready');
var stringify = require('./util/stringify');

var base = path.normalize(path.join(__dirname, '..'));

process.stdin.resume();

var DeveloperKit = function() {
  CommandInterface.apply(this, arguments);
}

util.inherits(DeveloperKit, CommandInterface);

DeveloperKit.prototype.configure = function() {
  var file = path.join(__dirname, 'rlx.md');
  var options = {
    commands: {
      log: {
        options: {
          offset: cli.types.integer,
          bytes: cli.types.integer
        }
      },
      uuids: {
        options: {
          count: cli.types.integer
        }
      }
    },
    options: {
      json: cli.types.json,
      file: cli.types.resource('-f', true, ['json', 'js'])
    }
  }
  var conf = {
    load: {
      file: file, options: options
    },
    substitute: {
      enabled: true
    },
    command: {
      dir: path.join(__dirname, 'command'),
      required: true
    },
    error: {
      locales: path.join(__dirname, 'error', 'locales')
    },
    manual: {
      dir: path.join(base, 'doc', 'man'),
      dynamic: process.env.NODE_ENV === 'devel'
    },
    env: {
      merge: true
    },
    rc: {
      merge: false,
      type: rc.JSON,
      base: base,
      name: '.rlxrc'
    },
    variables: {
      prefix: '@',
      coerce: true,
      delimiter: ','
    },
    boot: boot,
    ready: ready
  };
  this
    .configure(conf)
    .usage();
}

DeveloperKit.prototype.use = function() {
  this
    .use(cli.middleware.color)
    //.use(cli.middleware.verbose)
    .use(cli.middleware.logger, {level: logger.INFO}, {})
    //.use(cli.middleware.debug)

}

DeveloperKit.prototype.on = function() {
  this
    .once('load', function(req) {
      this
        .use(cli.middleware.manual)

      var levels = logger.keys, lvl;
      for(var i = 0;i < levels.length;i++) {
        lvl = levels[i];
        if(lvl === 'fatal') continue;
        this.option('log' + lvl + ':' + '--' + lvl, 'Set log level to ' + lvl);
      }

      this.help('-h, --help')
        .version();
    })
    .once('empty', function(req) {
      help.call(this);
    })
    .once('complete', function(req) {
      if(this.debug) this.log.debug(stringify(req));
      if(process.env.NODE_ENV !== 'test') {
        process.exit(0);
      }
    })
}

module.exports = function(pkg, name, description) {
  return new DeveloperKit(pkg, name, description);
}
