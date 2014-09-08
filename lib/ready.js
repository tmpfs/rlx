var util = require('util');
var logger = require('cli-logger');
var startup = require('./startup');
var merge = require('cli-util').merge;

module.exports = function ready(req, next) {
  var scope = this
    , conf = this.configure()
    , interactive = conf.interactive;

  //console.dir(req.substitute);
  //
  //console.log('ready called %s', conf.interactive);

  // set up log level from options
  var levels = logger.keys, lvl, i, l, v;
  this.log.level(this.log.INFO);
  for(i = 0;i < levels.length;i++) {
    l = levels[i];
    v = this['log' + levels[i]];
    //console.dir('checking level');
    if(v !== undefined) {
      v ? this.log.level(logger.levels[l]) : null;
      break;
    }
  }

  req.headers = {};
  req.document = {};
  req.output = {};
  req.login = req.login || {};
  var defaults = req.runcontrol.store[req.runcontrol.files[0]].highlight;
  req.highlight = merge(req.rc.highlight || defaults, {});

  // use the bundled source-highlight json lang/styles
  if(req.highlight.json) {
    if(~req.highlight.json['source-highlight'].indexOf('%s')) {
      req.highlight.json['source-highlight'] =
        util.format(defaults.json['source-highlight'],
          req.files.sh.style,
          req.files.sh.lang);
    }
  }

  this.server = this.server || req.rc.server;

  startup.validate.call(this, req, function(err) {
    //console.dir(err);
    if(err) return req.error(err, req, next);

    function authenticate() {
      req.auth.call(this, null, req, null, function() {
        startup.load.call(scope, req, next);
      });
    }

    if(req.hasCredentials()
      && req.result.unparsed[0] !== 'login' && !interactive) {
      authenticate.call(this);
    }else{
      startup.load.call(scope, req, next);
    }
  });
}
