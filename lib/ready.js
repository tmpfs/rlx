var util = require('util');
var logger = require('cli-logger');
var startup = require('./startup');
var merge = require('cli-util').merge;
var expand = require('./util/expand');
var alias = require('./util/alias');

module.exports = function ready(req, next) {
  var scope = this
    , log = this.log
    , conf = this.configure()
    , dbh = req.db()
    , interactive = conf.interactive
    , logbuffer
    , httpbuffer;

  if(!conf.logbuffer) {
    logbuffer = conf.logbuffer = new logger.RingBuffer({limit: 4096});
    httpbuffer = new logger.RingBuffer(
      {limit: 4096, records: logbuffer.records});
    this.log.streams.push(
      {type: logger.RAW, stream: logbuffer, level: logger.TRACE});
    dbh.log.streams.push(
      {type: logger.RAW, stream: httpbuffer, level: logger.TRACE});
    dbh.log.useConsoleStream();
  }

  this.log.levels(0, this.log.INFO);

  var lc = merge(this.log.conf, {});
  delete lc.prefix;
  dbh.log.conf = lc;

  if(this.http) {
  }

  if(this.logLevel && ~logger.keys.indexOf(this.logLevel)) {
    //console.log('setting log level : %s', this.logLevel);
    //console.dir(dbh.log.streams.length);
    this.log.levels(0, this.logLevel);
    dbh.log.levels(0, this.http === true ? this.logLevel : logger.NONE);
  }

  //throw new Error('mock error');

  // TODO: add --stack-trace option
  //conf.trace = this.trace;

  // *res* is used to store a response document
  req.res = {};

  req.headers = {};
  req.document = {};
  req.history = {};
  req.output = {};
  req.login = req.login || {credentials: {}, retries: 0};

  var defaults = req.runcontrol.store[req.runcontrol.files[0]].highlight;
  conf.highlight = merge(req.rc.highlight || defaults, {});

  // use the bundled source-highlight json lang/styles
  if(conf.highlight.json) {
    if(~conf.highlight.json['source-highlight'].indexOf('%s')) {
      conf.highlight.json['source-highlight'] =
        util.format(defaults.json['source-highlight'],
          req.files.sh.style,
          req.files.sh.lang);
    }
  }

  this.server = this.server || req.rc.server || undefined;

  // expand server arguments
  expand.call(this, req, function(err, expansions) {
    if(err) return req.error(err, req, next);
    expand.assign.call(this, expansions);

    // load aliases
    alias.load.call(scope, req, function(err) {
      if(err) return req.error(err, req, next);

      // expand aliases
      alias.expand.call(scope, req, function(err) {
        if(err) return req.error(err, req, next);

        // generic validation routines
        startup.validate.call(scope, req, function(err) {
          //console.dir(err);
          if(err) return req.error(err, req, next);

          function authenticate() {
            req.auth.call(scope, null, req, null, function(err) {
              if(err) return req.error(err, req, next);
              startup.load.call(scope, req, next);
            });
          }

          var shouldAuthenticate = req.hasCredentials(req) && !interactive;
          shouldAuthenticate = shouldAuthenticate
            && req.result.unparsed[0] !== 'login'
            && req.result.unparsed[0] !== 'info'
            && req.result.unparsed[0] !== 'i'
            && req.result.unparsed[0] !== 'interactive';

          // _all_dbs does not require auth
          if(req.result.unparsed[0] === 'db'
            && req.result.unparsed[1] === 'ls') {
            shouldAuthenticate = false;
          }

          if(shouldAuthenticate) {
            log.trace('ready.js: start up authentication (%s@%s), unparsed %j',
              req.login.credentials.user || scope.username,
              scope.server, req.result.unparsed);
            authenticate.call(scope);
          }else{
            startup.load.call(scope, req, next);
          }
        });
      });
    });
  });
}
