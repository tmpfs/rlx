var validate = require('../validate');
var descriptor = require('./schema');

var exec = 'exec';

function getResultObject(batch, opts) {
  var o = {}, k;
  o.exec = [];
  o.options = {};
  for(k in batch) {
    if(k === exec) continue;
    o.options[k] = batch[k];
  }
  if(opts.include) {
    o.batch = batch;
  }
  return o;
}

function injectOptions(batch, opts, cmd, ix) {
  var server = batch.server;
  var database = batch.database;
  if(!~cmd.indexOf(server)) {
    cmd.push('--server', server);
  }
  if(!~cmd.indexOf(database)) {
    cmd.push('--database', database);
  }

  if(ix && typeof ix === 'object' && !Array.isArray(ix)) {

  }

  return cmd;
}

/**
 *  Comile batch file into generic representation that can be executed.
 */
function compile(batch, opts, cb) {
  var res = getResultObject(batch, opts)
    , i, ix, ox, cmd;
  for(i = 0;i < batch.exec.length;i++) {
    ix = batch.exec[i];
    cmd = Array.isArray(ix) ? ix :
      Array.isArray(ix.cmd) ? ix.cmd : [];
    cmd = injectOptions(batch, opts, cmd.slice(0), ix);
    ox = {cmd: cmd};
    res.exec.push(ox);
  }
  cb(null, res, batch);
}

function parse(opts, cb) {
  if(typeof opts === 'function') {
    cb = opts;
    opts = null;
  }
  opts = opts || {};

  var batch = opts.batch
    , file = opts.file;

  if(file) {
    try {
      batch = require(file);
      batch.file = file;
    }catch(e) {
      return cb(e, batch);
    }
  }

  validate(batch, descriptor, function(errors, fields) {
    if(errors && errors.length) {
      return cb(errors[0]);
    }
    compile(batch, opts, cb);
  });
}

module.exports = parse;
