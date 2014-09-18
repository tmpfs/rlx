var assert = require('assert');
var prompt = require('cli-input')
  , colors = require('./colors')
  , completer = require('./completer')
  , location = require('./location')
  , utils = require('cli-util')
  , merge = utils.merge
  , ps;

var k;

var formats = {
  location: '%s> '
}

var prompts = {
  interactive: {
    list: [
      {
        infinite: true,
        required: true,
        split: /\s+/,
        completer: true
      }
    ]
  },
  credentials: {
    list: prompt.sets.userpass.slice(0)
  },
  password: {
    list: prompt.sets.password.slice(0)
  },
  newpass: {
    list: prompt.sets.newpass.slice(0)
  },
  rm: {
    list: [prompt.sets.definitions.confirm.clone()]
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
  opts = merge(opts, {}, {copy: true});
  opts.defaults = options.defaults;
  complete = options.completer || opts.completer;

  //var defs = merge(options, {});
  //opts = merge(opts, {});
  //opts = merge(opts, defs);
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
  opts.data.health = function(key, options) {
    if(!scope.server) return '';
    //return '☯';
    // u2600: ☀ ☁ ☂ ☃ ☄ ★ ☆ ☇ ☈ ☉ ☊ ☋ ☌ ☍ ☎ ☏ ☐ ☑ ☒ ☓ ☔ ☕ ☖ ☗ ☘ ☙ ☚ ☛ ☜ ☝ ☞ ☟
    // u2620: ☠ ☡ ☢ ☣ ☤ ☥ ☦ ☧ ☨ ☩ ☪ ☫ ☬ ☭ ☮ ☯ ☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷ ☸ ☹ ☺ ☻ ☼ ☽ ☾ ☿
    //return '☆';
    //return '⌛';
    //
    //⩆ ⩇
    //
    //return '☀';
    //return '⊗';
    //return '⁕';
    return '⌘';
  }

  //console.dir(opts);

  if(!ps) {
    opts.formats = formats;
    ps = prompt(opts);
  }

  var list = opts.list;
  if(list) {
    list = merge(list, [], {copy: true})
  }

  if(list && list.length && typeof cb === 'function') {
    //console.log('run with list %j', list);
    if(opts.defaults) {
      setDefaults(list, opts.defaults);
    }
    ps.run(list, cb);
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
  opts.history = req.history.store;
  opts.list[0].message = 'delete %s, are you sure? (y/n)';
  opts.list[0].parameters = [options.id];
  opts.infinite = false;
  opts.type = 'rm';
  if(ps) ps.removeAllListeners('unacceptable');
  var ps = get.call(this, opts, function(err, result) {
    if(ps) ps.removeAllListeners('unacceptable');
    //console.log('rm callback %s', ps.listeners('unacceptable').length)
    cb(err, result && result.map ? result.map.confirm : null);
  });
  ps.on('unacceptable', function unacceptable(value, options, ps) {
    log.warn(
      'unacceptable: expecting %s or %s',
      options.acceptable, options.rejectable);
  })
  return ps;
}

function credentials(info, req, cb) {
  if(this.interactive === false) {
    return cb(null, null);
  }
  var scope = this;
  var name = req.login.credentials
    ? req.login.credentials.user : this.username;
  var opts = {id: get.CREDENTIALS, defaults: {name: name}};
  opts.infinite = false;
  opts.type = 'credentials';
  var ps = get.call(this, opts, function(err, result) {
    cb(err, result ? result.map : null);
  });
  return ps;
}

function newpass(info, req, cb) {
  if(this.interactive === false) {
    return cb(null, null);
  }
  var scope = this, log = this.log;
  var opts = {id: get.NEWPASS};
  opts.type = 'newpass';
  var ps = get.call(this, opts, function(err, result) {
    ps.removeAllListeners('mismatch')
    cb(err, result ? result.map : null);
  });
  ps.on('mismatch', function(pass1, pass2, options, prompt) {
    log.warn('passwords do not match');
  })
  return ps;
}

function password(info, req, cb) {
  if(this.interactive === false) {
    return cb(null, null);
  }
  var scope = this;
  var opts = {id: get.PASSWORD};
  var ps = get.call(this, opts, function(err, result) {
    if(result && result.map) {
      scope.password = result.map.pass;
    }
    cb(err, result ? result.map : null);
  });
  return ps;
}

for(k in prompts) {
  prompts[k].id = k;
  get[k.toUpperCase()] = k;
}

get.prompts = prompts;
get.colors = colors;
get.completer = completer;
get.location = location;
get.credentials = credentials;
get.rm = rm;
get.password = password;
get.newpass = newpass;
get.history = require('./history');

module.exports = get;
