var fs = require('fs');
var path = require('path');

var util = require('util');
var glue = require('cli-interface');
var cli = require('cli-command'), help = cli.help;
var rc = require('cli-rc');
var CommandInterface = glue.CommandInterface;
var boot = require('./boot');
var ready = require('./ready');

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
      file: [cli.types.url, cli.types.file('-f', true)]
    }
  }
  //console.dir(options);
  var conf = {
    load: {
      file: file, options: options
    },
    substitute: {
      enabled: true
    },
    command: {
      dir: path.join(__dirname, 'command')
    },
    error: {
      locales: path.join(__dirname, 'error', 'locales')
    },
    manual: {
      dir: path.normalize(path.join(__dirname, '..', 'doc', 'man')),
      dynamic: process.env.NODE_ENV === 'devel'
    },
    env: {
      merge: true
    },
    rc: {
      merge: true,
      type: rc.INI,
      base: path.normalize(path.join(__dirname, '..'))
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
    .use(cli.middleware.logger, null, {})
    .use(cli.middleware.debug)
    .use(cli.middleware.verbose)
}

DeveloperKit.prototype.on = function() {
  this
    .once('load', function(req) {
      this
        .use(cli.middleware.manual)
        .help('-h, --help')
        .version();
    })
    .once('empty', function(req) {
      help.call(this);
    })
    .once('complete', function(req) {
      if(this.debug) this.log.debug(JSON.stringify(req, undefined, 2));
      //console.dir(req.rc);
      //console.log('registry: %s', this.registry);
    })
}

module.exports = function(pkg, name, description) {
  return new DeveloperKit(pkg, name, description);
}
