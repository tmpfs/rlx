var assert = require('assert');
var prompt = require('cli-input')
  , colors = require('./colors')
  , completer = require('./completer')
  , location = require('./location');

var prompts = {
  interactive: {
    infinite: true,
    split: /\s+/,
    formats: {
      location: '%s> '
    },
    completer: true
  }
}

function get(options) {
  options = options || {};
  var scope = this, id, opts, complete;
  id = options.id || 'interactive';
  assert(prompts.hasOwnProperty(id), 'unknown prompt identifier')
  opts = prompts[id];
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

  return prompt(opts);
}

get.colors = colors;
get.completer = completer;
get.location = location;

module.exports = get;
