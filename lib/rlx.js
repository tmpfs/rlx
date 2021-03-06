//process.env.CLI_TOOLKIT_DEBUG=true;
//process.env.CLI_TOOLKIT_MIDDLEWARE_REQUEST=true;
//process.env.CLI_INPUT_NO_READLINE_PATCH=true;

//var start = process.hrtime();

var path = require('path');

var util = require('util');
var querystring = require('querystring');
var circular = require('circular');

var cdb = require('cdb');

var glue = require('cli-interface');

//var diff = process.hrtime(start);
//console.log('requires took %d microseconds',
  //(diff[0] * 1e9 + diff[1]) / 1000);

var cli = require('cli-command'), help = cli.help;

var rc = require('cli-rc');
var logger = require('cli-logger');
var CommandInterface = glue.CommandInterface;
var ConverterMap = require('cli-converter-util').ConverterMap;

var boot = require('./boot');
var ready = require('./ready');
var before = require('./before');
var stringify = require('./util/stringify');
var resolve = require('./util/resolve');
var dirs = require('./request/dirs');
var expand = require('cli-property').expand;
var debuglog = require('./util/debug-log');
var merge = require('cli-util').merge;

var base = path.normalize(path.join(__dirname, '..'));

//process.stdin.resume();

var Relax = function() {
  CommandInterface.apply(this, arguments);
}

util.inherits(Relax, CommandInterface);

Relax.prototype.configure = function() {
  var file = path.join(__dirname, this.name() + '.md');
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
      //console.dir(cli.types.json);
      //file: cli.types.resource('-f', true, ['json', 'js']),
      file: new ConverterMap({
        default: cli.types.resource('-f', true, ['json', 'js']),
        attach: cli.types.resource('-f', true),
        application: cli.types.resource('-f', true)
      }),
      attachment: cli.types.string,
      feed: cli.types.enum(Object.keys(cdb.feeds)),
      logLevel: cli.types.enum(logger.keys)
    }
  }
  var conf = {
    start: {
      time: new Date(),
      cwd: process.cwd()
    },
    stdin: true,
    trace: process.env.NODE_ENV === 'devel',
    //trace: true,
    compiler: {
      input: [file],
      output: path.join(__dirname, this.name() + 'c.js'),
      definition: options,
      cache: process.env.NODE_ENV !== 'devel'
    },
    command: {
      dir: path.join(__dirname, 'command'),
      required: true,
      delimiter: /[\/:]/,
      before: before
    },
    error: {
      locales: path.join(__dirname, 'error', 'locales'),
      log: {
        print: false
      },
      intercept: function(req, next, e, err, parameters, source) {
        // TODO: we always need a list of errors for the request.
        //req.errors = req.errors || [];
        //req.errors.push(
          //{e: e, err: err, parameters: parameters, source: source });
        //

        //console.log('intercept called');

        if(!req.rc) return true;
        if(!req.rc.error.json) return true;
        // emit raise so we still capture the error
        this.emit('raise', e, this.errors, err, parameters, source);
        req.error.call(this, e, req, next);
        return false;
      }
    },
    manual: {
      dir: path.join(base, 'doc', 'man'),
      dynamic: process.env.NODE_ENV === 'devel'
    },
    env: {
      merge: false,
      cache: true,
      //cache:  process.env.NODE_ENV !== 'test',
      rcmerge: function(env, rc) {
        var expanded = expand(env);
        var merged = merge(expanded, rc);
        return env;
      },
      expand: {
        delimiter: '.'
      },
      native: {delimiter: ',', json: false}
    },
    rc: {
      merge: false,
      type: rc.JSON,
      cache: process.env.NODE_ENV !== 'test',
      //enabled: process.env.NODE_ENV !== 'test',
      base: base,
      name: '.' + this.name() + 'rc',
      resolve: resolve,
      keys: {
        append: 'searchPath'
      },
      home: function() {
        return dirs.home;
      },
      onload: function(req, next, rc, runcontrol) {
        var match
          , ptn = rc.alias.match
          , ignores = rc.history.ignores;

        try{
          match = new RegExp(ptn);
        }catch(e) {
          return req.error(this.wrap(
            this.errors.EREGEXP_COMPILE, [ptn, 'alias.match'], e), req, next);
        }

        rc.alias.match = match;

        if(!Array.isArray(ignores)) {
          ignores = rc.history.ignores = [ignores];
        }

        for(var i = 0;i < ignores.length;i++) {
          try {
            ignores[i] = new RegExp(ignores[i]);
          }catch(e) {
            return req.error(this.wrap(
              this.errors.EREGEXP_COMPILE,
              [ignores[i], 'history.ignores[' + i + ']'], e), req, next);
          }
        }

        //console.log('after rc load: %s', this.server);
        //console.dir(rc);

        next();
      }
    },
    variables: {
      prefix: '@',
      coerce: true,
      delimiter: ','
    },
    help: {
      width: 26
    },
    debug: {
      file: this.name() + '-debug.log'
    },
    boot: boot,
    ready: ready,
  };
  this
    .configure(conf)
    .usage();
}

Relax.prototype.use = function() {
  var opts = {level: logger.INFO, json: false};

  this
    .use(require('cli-mid-color'))
    .use(require('cli-mid-logger'), opts)
}

Relax.prototype.on = function() {

  var scope = this
    , conf = this.configure();

  if(process.env.NODE_ENV  === 'test') {
    process.setMaxListeners(4096);
  }

  process.on('exit', function onexit(code) {
    // write debug log file
    debuglog.call(scope, code, scope.configure().rc);
  })

  this
    .once('load', function(req) {
      //console.log('load %s', this.options().server.value());
      //this.reset();
      this
        .use(require('cli-mid-manual'))
        .help('--help')
        .version(null, null, 'Print version and exit');
    })
    .on('notify:database', function(req, next, arg, value) {
      if(this.database) {
        this.database = querystring.unescape(this.database);
      }
      if(conf.interactive && value === undefined) {
        delete this.database;
      }else{
        var validator = require('./startup/validator/db');
        return validator.call(this, req, next);
      }
      next();
    })
    .on('raise', function(err, errors) {
      var conf = this.configure();
      var errs = conf.errors = conf.errors || [];
      var o = {
        name: err.name,
        message: err.message,
        code: err.code,
        key: err.key,
        parameters: err.parameters || [],
        stack: err.toStackArray(),
        time: new Date()
      }
      errs.push(o);
    })
    .on('help:trailers', function ontrailers(doc, data, stream) {
      var i, cmd, col, conf = this.configure();
      var cmds = [
        {
          name: util.format('%s --help <cmd>', data.name),
          message: 'quick help on <cmd>'
        },
        {
          name: util.format('%s help <cmd>', data.name),
          message: 'documentation for <cmd>'
        },
        {
          name: util.format('%s i', data.name),
          message: 'launch interactive console'
        }
      ];

      if(conf.interactive) {
        cmds.pop();
      }

      if(doc.style === 'cmd') {
        doc.print(stream);
        for(i = 0;i < cmds.length;i++) {
          cmd = cmds[i];
          col = doc.toColumns.call(doc, cmd.name, cmd.message);
          doc.print(stream, col.left + col.right);
        }
      }

      if(doc.style !== 'man') {
        // overall footer
        doc.print(stream);
        doc.print(stream,
          util.format('%s@%s %s',
            data.name, data.version, path.dirname(__dirname)));
      }
    })
    .on('empty', function(help, version, req, next) {
      var conf = this.configure();
      help.call(this, 'cmd');
    })
    .once('complete', function(req) {


      var conf = this.configure();

      // error occured during bootup of interactive console
      if(conf.interactive && conf.errors.length) {
        process.exit(conf.errors.pop().code);
      }

      // standard end of execution
      if(process.env.NODE_ENV !== 'test' && !conf.interactive) {
        process.exit(0);
      }
    })
}

module.exports = function(pkg, name, description) {
  return new Relax(pkg, name, description);
}
