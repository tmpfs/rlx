var util = require('util');
var logger = require('cli-logger');
var startup = require('./startup');
var merge = require('cli-util').merge;

module.exports = function ready(req, next) {
  var scope = this;

  //console.dir(req.substitute);

  // set up log level from options
  var levels = logger.keys, lvl, i;
  for(var i = 0;i < levels.length;i++) {
    //console.dir('checking level');
    if(this['log' + levels[i]] === true) {
      this.log.level(logger.levels[levels[i]]);
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
    req.highlight.json['source-highlight'] =
      util.format(defaults.json['source-highlight'],
        req.files.sh.style,
        req.files.sh.lang);
  }

  startup.validate.call(this, req, function(err) {
    if(err) return req.error(err, req, next);

    function authenticate() {
      req.auth.call(this, null, req, null, function() {
        startup.load.call(scope, req, next);
      });
    }

    if(req.hasCredentials() && req.result.unparsed[0] !== 'login') {
      authenticate.call(this);
    }else{
      startup.load.call(scope, req, next);
    }
  });
}
