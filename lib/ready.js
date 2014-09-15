var util = require('util');
var logger = require('cli-logger');
var startup = require('./startup');
var merge = require('cli-util').merge;

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
  }

  this.log.levels(0, this.log.INFO);

  if(this.logLevel && ~logger.keys.indexOf(this.logLevel)) {
    this.log.levels(0, this.logLevel);
  }

  if(this.http) {
    dbh.log.useConsoleStream();
    dbh.log.conf = this.log.conf;
    dbh.log.levels(0, this.log.level());
  }else{
    dbh.log.levels(0, logger.NONE);
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
