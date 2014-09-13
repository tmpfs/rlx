var validate = require('../validate')
  , stringify = require('../stringify')
  , descriptor = require('./schema')
  , utils = require('cli-util')
  , delimited = utils.delimited;

var exec = 'exec'
  , prefix = '--'
  , noprefix = 'no-';

var map = {
  server: '--server',
  database: '--database'
}

var known = ['cmd', 'json', 'header', 'query', 'glob'];

var methods = {
  json: json,
  header: expand,
  query: expand,
  glob: expand,
}

function expand(key, value, cmd) {
  if(!Array.isArray(value)) {
    value = ['' + value];
  }
  for(var i = 0;i < value.length;i++) {
    cmd.push(prefix + key, value[i]);
  }
}

function json(key, value, cmd) {
  if(typeof value !== 'string') {
    value = stringify(value, null, 0);
  }
  cmd.push(prefix + key, value);
}

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

/**
 *  Translate a key into an option name.
 */
function translate(key, value, cmd) {
  var bool = typeof(value) === 'boolean';
  var no = bool  && value === false;
  var k = prefix + (no ? noprefix : '') + delimited(key, null, true);
  bool ? cmd.push(k) : cmd.push(k, value);
}

function injectOptions(batch, opts, cmd, ix, ox) {
  var server = batch.server
    , database = batch.database
    , k, v, keys = Object.keys(map)
    , mapped = {};

  if(ix && typeof ix === 'object' && !Array.isArray(ix)) {
    for(k in ix) {
      v = ix[k];
      if(~known.indexOf(k)) {
        if(methods[k]) {
          methods[k](k, v, cmd);
        }
        continue;
      }
      ox.props = ox.props || {};
      ox.props[k] = v;
      if(~keys.indexOf(k)) {
        cmd.push(map[k], v);
        mapped[k] = v;
      }else{
        translate(k, v, cmd);
      }
    }
  }

  // all commands must be strings
  cmd = cmd.map(function(arg) {
    return '' + arg;
  })

  return cmd;
}

/**
 *  Compile batch file into generic representation that can be executed.
 */
function compile(batch, opts, cb) {
  var res = getResultObject(batch, opts)
    , i, ix, ox, cmd;
  for(i = 0;i < batch.exec.length;i++) {
    ix = batch.exec[i], ox = {};
    if(typeof ix === 'string') {
      ix = ix.split(' ');
    }
    if(ix && typeof ix.cmd === 'string') {
      ix.cmd = ix.cmd.split(' ');
    }
    cmd = Array.isArray(ix) ? ix :
      Array.isArray(ix.cmd) ? ix.cmd : [];
    cmd = injectOptions(batch, opts, cmd.slice(0), ix, ox);
    ox.cmd = cmd;
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
    , file = opts.file
    , cli = opts.cli;

  if(file) {
    try {
      batch = require(file);
    }catch(e) {
      return cb(e, batch);
    }
  }

  function start(batch) {
    batch.file = file;
    validate(batch, descriptor, function(errors, fields) {
      if(errors && errors.length) {
        return cb(errors[0]);
      }
      compile(batch, opts, cb);
    });
  }

  if(typeof batch === 'function') {
    batch.call(cli, function(err, batch) {
      if(err) return cb(err);
      start(batch);
    });
  }else{
    start(batch);
  }
}

module.exports = parse;
