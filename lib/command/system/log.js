var util = require('util')
  , repeat = require('cli-util').repeat;
function pretty(name, log, record) {
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

    //console.dir(arguments);

    return {msg: msg, parameters: parameters};
  }
  cstream.write(o, prefix, opts);
}

module.exports = function log(info, req, next) {
  var records = this.configure().logbuffer.records.slice(0)
    , log = this.log
    , raw = this.raw
    , name = this.name();
  records.forEach(function(record) {
    record.id = log.names(record.level);
    if(raw) pretty(name, log, record);
  })
  if(!raw) {
    return req.print(records, req, next);
  }
  next();
}
