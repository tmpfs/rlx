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
  return o;
}

function getCommonOptions(batch, opts, cmd) {
  var server = batch.server;
  var database = batch.database;
  if(!~cmd.indexOf(server)) {
    cmd.push('--server', server);
  }
  if(!~cmd.indexOf(database)) {
    cmd.push('--database', database);
  }
  return cmd;
}

/**
 *  Raw command declarations.
 */
function raw(batch, opts, cb) {
  var res = getResultObject(batch, opts)
    , i, ix, ox;

  for(i = 0;i < batch.exec.length;i++) {
    ix = batch.exec[i];
    if(Array.isArray(ix.cmd)) {
      ox = {
        cmd: getCommonOptions(batch, opts, ix.cmd.slice(0))
      }
      res.exec.push(ox);
    }
  }
  cb(null, res, batch);
}

/**
 *  Infer arguments from object structure.
 */
function infer(batch, opts, cb) {
  var res = getResultObject(batch, opts);
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
    }catch(e) {
      return cb(e, batch);
    }
  }

  var mode = batch.raw;

  validate(batch, descriptor, function(errors, fields) {
    if(errors && errors.length) {
      return cb(errors[0]);
    }
    mode ? raw(batch, opts, cb) : infer(batch, opts, cb);
  });
}

module.exports = parse;
