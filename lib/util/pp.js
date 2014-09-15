var util = require('util')
  , EOL = require('os').EOL
  , utils = require('cli-util')
  , hasNewline = utils.hasNewline
  , repeat = utils.repeat;

function format(prefix, msg, parameters, record, multiline) {
  var opts = {}, name = record ? record.name : '';
  if(prefix && typeof prefix === 'object') {
    opts = prefix;
    prefix = null;
    msg = msg || opts.msg;
    parameters = parameters || opts.parameters || [];
    record = record || opts.record;
    multiline = multiline || opts.multiline;
    name = opts.name;
  }

  if(!record.component) record.component = 'main';
  var fill = '';
  var id = '' + record.id;
  if(id.length < 6) {
    fill += repeat(6 - id.length);
  }
  var fmt = name + ' | ' + record.component.toUpperCase() + ' [%s%s] ';
  msg = fmt + msg;
  parameters = parameters || [];
  parameters.unshift(id);
  parameters.unshift(fill);
  //parameters.unshift(name);
  return {msg: msg, parameters: parameters};
}

/**
 *  Gets a string representation of a log record.
 *
 *  Debug log file write.
 */
function toString(opts) {
  opts = opts || {};
  var res, lines, s = '', record = opts.record, stack;

  if(opts.pad && hasNewline(opts.msg, opts.parameters)) {
    var lines = opts.msg.split('\n');
    lines.forEach(function(line) {
      res = format(opts, '' + line, [], opts.record, true);
      line = util.format.apply(
        util, [res.msg].concat(res.parameters.slice(0)));
      if(!/\n$/.test(line)) {
        line += EOL;
      }
      s += line;
    })
  }else{
    res = format(opts);
    s = util.format.apply(
      util, [res.msg].concat(res.parameters.slice(0))) + EOL;
  }

  stack = getStack(record);

  if(stack) {
    stack.forEach(function(line) {
      res = format(opts, repeat(2) + line, [], opts.record, true);
      line = util.format.apply(
        util, [res.msg].concat(res.parameters.slice(0)));
      if(!/\n$/.test(line)) {
        line += EOL;
      }
      s += line;
    })
  }

  return s;
}

function getStack(record) {
  var stack;
  if(record.err && record.err.stack) {
    stack = record.err.stack;
    if(typeof stack === 'string') stack = stack.split('\n');
    return stack.slice(0);
  }
}

/**
 *  Pretty print a log record to the log
 *  console stream (sys/log).
 */
function conrec(name, log, record) {
  var cstream, stack;

  // log record where replacment has already been performed
  if(!record.message && record.msg) {
    record.message = record.msg;
    record.parameters = [];
  }

  // should be using a console stream
  cstream = log.streams[0].stream;
  cstream.write(record, format);

  stack = getStack(record);

  if(stack) {
    stack.forEach(function(line) {
      cstream.write(record, format, repeat(2) + line, []);
    })
  }
}

/**
 *  Pretty print an error using console.error.
 */
function conerr(name, log, err) {
  var prefix = name + ' | '
    , indent = '  '
    , stack = err.stack || [];

  function print(message, parameters) {
    parameters = parameters.slice(0)
    message = prefix + message;
    console.error.apply(
      console, [message].concat(parameters));
  }

  print('%s (%s) %s', [err.key, err.code, err.time]);
  print(indent + err.message, err.parameters);
  stack.forEach(function(line) {
    print(indent + indent + line, []);
  })
}

module.exports = {
  conrec: conrec,
  conerr: conerr,
  format: format,
  toString: toString,
}
