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
  var fmt = '%s | ' + record.component.toUpperCase() + ' [%s%s] ';
  msg = fmt + msg;
  parameters = parameters || [];
  parameters.unshift(id);
  parameters.unshift(fill);
  parameters.unshift(name);
  //console.dir(msg);
  //console.dir(parameters);
  return {msg: msg, parameters: parameters};
}

function toString(opts) {
  opts = opts || {};
  var res, lines, s = '';
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
    return s;
  }
  res = format(opts);
  return util.format.apply(
    util, [res.msg].concat(res.parameters.slice(0))) + EOL;
}

/**
 *  Pretty print a log record to the log
 *  console stream.
 */
function conrec(name, log, record) {

  // log record where replacment has already been performed
  if(!record.message && record.msg) {
    record.message = record.msg;
    record.parameters = [];
  }

  // should be using a console stream
  var cstream = log.streams[0].stream;
  cstream.write(record, format);
}

/**
 *  Pretty print an error using console.error.
 */
function conerr(name, log, err) {
  var prefix = name + ' ! '
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
