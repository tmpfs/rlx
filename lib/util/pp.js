var util = require('util')
  , repeat = require('cli-util').repeat;

/**
 *  Pretty print a log record to the log
 *  console stream.
 */
function conrec(name, log, record) {
  // should be using a console stream
  var o = {}, k;
  for(k in record) {
    o[k] = record[k];
  }
  o.message = o.msg;
  o.parameters = [];
  var cstream = log.streams[0].stream;
  var opts = {};
  function prefix(prefix, msg, parameters, record, multiline) {
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
    return {msg: msg, parameters: parameters};
  }
  cstream.write(o, prefix, opts);
}

/**
 *  Pretty print an error using console.error.
 */
function conerr(name, log, err) {
  var prefix = '%s ! '
    , indent = '  '
    , stack = err.stack || [];

  function print(message, parameters) {
    parameters = parameters.slice(0)
    message = prefix + message;
    parameters.unshift(name);
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
}
