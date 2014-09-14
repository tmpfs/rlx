var util = require('util');
var logger = require('cli-logger');
var startup = require('./startup');
var merge = require('cli-util').merge;

module.exports = function ready(req, next) {
  var scope = this
    , conf = this.configure()
    , interactive = conf.interactive;

  this.log.level(this.log.INFO);

  if(this.logLevel && ~logger.keys.indexOf(this.logLevel)) {
    this.log.level(this.logLevel);
  }

  conf.trace = this.trace;

  // *res* is used to store a response document
  req.res = {};

  req.headers = {};
  req.document = {};
  req.history = {};
  req.output = {};
  req.login = req.login || {credentials: {}, retries: 0};
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

  // allow earlier middleware to mark a document
  // as needing to be printed, interactive required
  // logic for example
  if(req.printable) {
    return req.print(req.printable, req, next);
  }

  startup.validate.call(this, req, function(err) {
    //console.dir(err);
    if(err) return req.error(err, req, next);

    function authenticate() {
      req.auth.call(this, null, req, null, function() {
        startup.load.call(scope, req, next);
      });
    }

    if(req.hasCredentials(req)
      && req.result.unparsed[0] !== 'login' && !interactive) {
      authenticate.call(this);
    }else{
      startup.load.call(scope, req, next);
    }
  });
}
