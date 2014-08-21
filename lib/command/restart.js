function wait(info, req, next) {
  var scope = this, log = this.log, errors = this.errors;
  var dbh = req.db(), opts = req.db.options();
  var retries = req.rc.restart.retries++;
  var interval = req.rc.restart.interval;
  var max = req.rc.restart.max;
  function poll(info, req, next) {
    retries++;
    log.debug('restart retry attempt %s', retries);
    dbh.info(opts, function oninfo(err, res, doc) {
      var ok = !err && res && res.statusCode === 200;
      if(ok) {
        log.info('restart complete, server responding');
        return next();
      }else if(retries < max) {
        return wait.call(scope, info, req, next);
      }
      next(errors.ERESTART_LIMIT);
    });
  }
  setTimeout(function() {
    poll.call(this, info, req, next);
  }, interval);
}

module.exports = function restart(info, req, next) {
  var scope = this, log = this.log;
  var opts = req.db.options();
  var dbh = req.db();
  dbh.restart(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    var waits = req.rc.restart.wait;
    if(waits && res.statusCode === 202) {
      req.print(doc, req, function printed() {
        log.info('restart accepted, waiting for %s', opts.server);
        req.rc.restart.retries = 0;
        wait.call(scope, info, req, next);
      });
    }else{
      req.print(doc, req, next);
    }
  })
}
