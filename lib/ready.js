var util = require('util');
var logger = require('cli-logger');
var startup = require('./startup');

module.exports = function ready(req, next) {
  var scope = this;

  // set up log level from options
  var levels = logger.keys, lvl, i;
  for(var i = 0;i < levels.length;i++) {
    if(this['log' + levels[i]] === true) {
      this.log.level(logger.levels[levels[i]]);
      break;
    }
  }

  req.document = {};
  req.login = req.login || {};

  // updates source highlight paths
  if(req.rc.highlight.json['source-highlight']) {
    req.rc.highlight.json['source-highlight'] =
      util.format(req.rc.highlight.json['source-highlight'],
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
