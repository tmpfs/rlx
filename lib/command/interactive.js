var url = require('url');
var prompt = require('cli-input');
var ansi = require('ttycolor').ansi;

var colors = {
  //prefix: function(name, delimiter) {
    //var space = ' ';
    //var colored = name + space + ansi(delimiter).cyan.valueOf(true);
    //colored = ansi(colored).bg.black.valueOf(true)
    //return {
      //value: name + space + delimiter + space, color: colored + space}
  //},
  name: function(v) {
    if(!v) return v;
    return ansi(v).bright.valueOf(true);
  },
  delimiter: function(v) {
    if(!v) return v;
    return ansi(v).cyan.valueOf(true);
  },
  default: function(v) {
    if(!v) return v;
    return ansi(v).underline.valueOf(true);
  },
  location: function(v) {
    if(!v) return v;
    return ansi(v).blue.valueOf(true);
  }
}

function welcome() {
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
}


module.exports = function interactive(info, req, next) {
  function completer(line, cb) {
    //console.log('line "%s"', line);
    var completions = [''];
    var val = line.trim();
    if(!val) {
      return cb(null, [completions, line]);
    }
    var parts = line.split(/\s+/);

    // completing on the word before the cursor
    var word = parts.pop();

    // top-level commands/options
    var cmds = this.commands();
    var opts = this.options();

    // get list of candidates
    function candidates(word, index) {
      var list = [], k, v, i, names;

      function match(cmds) {
        for(k in cmds) {
          v = cmds[k];
          // TODO: need to sort names
          names = v.names().reverse();
          for(i = 0;i < names.length;i++) {
            if(names[i].indexOf(word) === 0) {
              list.push(names[i]);
              break;
            }
          }
        }
      }

      // match on commands
      if(!/^-/.test(word)) {
        match(cmds);
      // match on options
      }else{
        //console.log('match on options');
        match(opts);
      }
      if(list.length === 1 && list[0] === word) {
        return completions;
      }
      return list;
    }

    var list = candidates(word, parts.length);
    //console.dir(list);
    completions = completions.concat(list);
    return cb(null, [completions, line]);
  }

  var scope = this
    , log = this.log
    , opts = {
      completer: function rlcompleter(line, cb) {
        completer.call(scope, line, cb)
      },
      infinite: true,
      split: /\s+/,
      colors: colors
    }
    , conf = this.configure()
    , ps = prompt(opts);

  opts.formats = {
    location: '%s> '
  }

  function getLocation(key, options) {
    if(!scope.server) return null;
    var u = url.parse(scope.server);
    if(scope.username) {
      return u.protocol + '//' + scope.username + '@' + u.host;
    }
    return scope.server;
  }

  opts.data = {};
  opts.data.location = getLocation;

  // flag as interactive console
  conf.interactive = true;

  // store a reference to the prompt
  // in the program configuration so that
  // authentication handlers can resume the prompt
  conf.ps = ps;

  // now we don't want errors to quit the process
  conf.exit = false;

  // disable property conflict detection
  conf.conflict = false;

  // command is no longer required
  // allows options to just set propertes, eg: --http --trace
  conf.command.required = function(req, next) {
    //console.dir('handle setting argument properties');
    var k, v;
    for(k in req.result.all) {
      v = req.result.all[k];
      //console.log('%s = %s', k, v);
      this[k] = v;
    }
    next();
  }

  //console.dir(conf);

  // delete this command, cannot recurse into this handler
  //delete this.commands().interactive;

  //console.dir(this.commands().interactive);

  // hook up interactive specific commands
  this.command('exit: q, quit, exit')
    .description('Quit interactive session')
    .action(function(info, req, next) {
      process.exit(0);
    });

  // additional help command alias
  this.options().helpopt.names().push('?');

  // get some input
  ps.on('value', function(val) {

    // empty string - nothing to execute
    if(!val) return;

    // cannot recurse into this command handler
    if(val.indexOf('i') === 0 || val.indexOf('interactive') === 0) {
      log.error('cannot nest interactive consoles');
      return;
    }

    // pause the prompt during execution
    ps.pause();

    // parse the argumente through *this* program
    // specify a callback so the middleware processing halts
    // on the first error and so the default program *complete*
    // listener does not fire
    scope.parse(val, function(err, req, parameters, e) {
      parameters = parameters || [];
      if(err && err !== true) {
        // little dance to ensure error parameters and
        // default error argument lookup are respected
        return req.error(err, req, function(err, args) {
          scope.raise(err, args);
          ps.resume();
        }, parameters);
      }
      ps.resume();
    });
  })

  welcome.call(this);

  // run the prompt
  ps.run();
}

module.exports.colors = colors;
