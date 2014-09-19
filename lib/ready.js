var util = require('util');
var logger = require('cli-logger');
var startup = require('./startup');
var merge = require('cli-util').merge;
var expand = require('./util/expand');

module.exports = function ready(req, next) {
  var scope = this
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

  // allow earlier middleware to mark a document
  // as needing to be printed, interactive required
  // logic for example
  if(req.printable) {
    return req.print(req.printable, req, next);
  }

  expand.call(this, req, function(err, expansions) {
    if(err) return req.error(err, req, next);

    expand.assign.call(this, expansions);

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
  });
}
