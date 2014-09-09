var assert = require('assert');
var prompt = require('cli-input')
  , colors = require('./colors')
  , completer = require('./completer')
  , location = require('./location');

var k;

var prompts = {
  interactive: {
    infinite: true,
    split: /\s+/,
    formats: {
      location: '%s> '
    },
    completer: true
  },
  auth: {
    list: prompt.sets.userpass
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

for(k in prompts) {
  get[k.toUpperCase()] = k;
}

get.colors = colors;
get.completer = completer;
get.location = location;

module.exports = get;
