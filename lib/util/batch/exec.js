var assert = require('assert');
var async = require('async');
var load = require('./load');

var allowed = [
  'server',
  'database',
  'id',
  'rev',
  'ddoc',
  'username',
  'password',
  'interactive',
  'color',
  'noop',

  'http',
  'trace',
  'debug',
  'info',
  'warn',
  'error',
];

/**
 *  Run a batch file command by re-parsing through
 *  the cli program.
 */
function run(item, opts, cb) {
  var cli = opts.cli
    , cmd = item.cmd
    , conf = cli.configure();
  conf.conflict = false;
  conf.suppress = true;
  //console.dir(cmd);
  cli.parse(cmd, function(req, err, parameters, e) {
    cb(err, req && req.res ? req.res.document : null);
  });
}

function assign(item, opts) {
  var cli = opts.cli;
  var props = item.options;
  cli.reset();
  for(var k in props) {
    if(!~allowed.indexOf(k)) continue;
    cli[k] = props[k];
  }
}

/**
 *  Execute a single batch file.
 */
function execute(item, opts, cb) {
  assign(item, opts);
  //console.dir(item);
  // iterate over each item in the batch
  async.concatSeries(item.exec, function(item, cb) {
    // run a single command
    run(item, opts, cb);
  }, function(err, res) {
    cb(err, res);
  })
}

/**
 *  Execute a series of batch files.
 */
function exec(opts, cb) {
  if(typeof opts === 'function') {
    cb = opts;
    opts = null;
  }
  opts = opts || {};
  assert(opts.cli, 'must specify a cli program to execute a batch');
  load(opts, function(err, execs) {
    if(err) return cb(err);
    opts.execs = execs;
    // iterate over each batch file
    async.concatSeries(execs, function(item, cb) {
      // execute the batch file
      execute(item, opts, cb);
    }, function(err, res) {
      cb(err, res);
    })
  })
}

module.exports = exec;
