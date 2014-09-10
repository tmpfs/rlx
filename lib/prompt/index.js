var assert = require('assert');
var prompt = require('cli-input')
  , colors = require('./colors')
  , completer = require('./completer')
  , location = require('./location');

var k;

var prompts = {
  interactive: {
    infinite: true,
    required: true,
    split: /\s+/,
    formats: {
      location: '%s> '
    },
    completer: true
  },
  credentials: {
    list: prompt.sets.userpass
  },
  password: {
    list: prompt.sets.password
  },
  newpass: {
    list: prompt.sets.newpass
  },
  rm: {
    list: prompt.sets.confirm
  }
}

function setDefaults(set, defaults) {
  var map = {}, k;
  set.forEach(function(value) {
    if(value.key) {
      map[value.key] = value;
    }
  });

  for(k in defaults) {
    if(map[k]) {
      map[k].default = defaults[k];
    }
  }
}

function get(options, cb) {
  var conf = this.configure();
  if(this.interactive === false && !conf.interactive) {
    return false;
  }
  options = options || {};
  var scope = this, id, opts, complete;
  if(typeof options === 'string') {
    options = {id: options};
  }
  id = options.id || 'interactive';
  assert(prompts.hasOwnProperty(id), 'unknown prompt identifier')
  opts = prompts[id];
  opts.defaults = options.defaults;
  complete = options.completer || opts.completer;
  if(this.color !== false) {
    opts.colors = colors.call(this)();
  }
  if(complete === true) {
    opts.completer = function rlcompleter(line, cb) {
      completer.call(scope, line, cb)
    }
  }else if(typeof complete === 'function') {
    opts.completer = options.completer;
  }

  var getLocation = location.call(scope);
  opts.data = options.data || {};
  opts.data.location = getLocation;

  var ps = prompt(opts);

  if(opts.list && opts.list.length && typeof cb === 'function') {
    if(opts.defaults) {
      setDefaults(opts.list, opts.defaults);
    }
    ps.run(opts.list, cb);
  }
  return ps;
}

function rm(info, req, options, cb) {
  if(this.interactive === false) {
    return cb(null, {accept: true});
  }
  options = options || {};
  var scope = this, log = this.log;
  var opts = prompts.rm;
  opts.list[0].message = 'delete %s, are you sure? (y/n)';
  opts.list[0].parameters = [options.id];
  var ps = get.call(this, opts, function(err, result) {
    if(ps) ps.removeAllListeners('unacceptable');
    cb(err, result && result.map ? result.map.confirm : null);
  });
  ps.on('unacceptable', function unacceptable(value, options, ps) {
    log.warn(
      'unacceptable: expecting %s or %s',
      options.acceptable, options.rejectable);
  })
}

function credentials(info, req, cb) {
  if(this.interactive === false) {
    return cb(null, null);
  }
  var scope = this;
  var name = req.login.credentials
    ? req.login.credentials.user : this.username;
  //console.log('credentials got name %s', name);
  var opts = {id: get.CREDENTIALS, defaults: {name: name}};
  get.call(this, opts, function(err, result) {
    cb(err, result ? result.map : null);
  });
}

function newpass(info, req, cb) {
  if(this.interactive === false) {
    return cb(null, null);
  }
  var scope = this, log = this.log;
  var opts = {id: get.NEWPASS};
  var ps = get.call(this, opts, function(err, result) {
    ps.removeAllListeners('mismatch')
    cb(err, result ? result.map : null);
  });
  ps.on('mismatch', function(pass1, pass2, options, prompt) {
    log.warn('passwords do not match');
  })
}

function password(info, req, cb) {
  if(this.interactive === false) {
    return cb(null, null);
  }
  var scope = this;
  var opts = {id: get.PASSWORD};
  get.call(this, opts, function(err, result) {
    if(result && result.map) {
      scope.password = result.map.pass;
    }
    cb(err, result ? result.map : null);
  });
}

for(k in prompts) {
  prompts[k].id = k;
  get[k.toUpperCase()] = k;
}

get.colors = colors;
get.completer = completer;
get.location = location;
get.credentials = credentials;
get.rm = rm;
get.password = password;
get.newpass = newpass;

module.exports = get;
