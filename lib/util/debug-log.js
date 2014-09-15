var fs = require('fs')
  , EOL = require('os').EOL
  , path = require('path')
  , stringify = require('./stringify')
  , pp = require('./pp');

function debug(code) {
  var conf = this.configure()

  // too early nothing to collect
  if(!conf || !conf.logbuffer) return;

  var log = this.log
  , name = this.name()
  , rc = conf.rc.info.rc
  , errs = conf.errors || []
  , file = path.join(process.cwd(), conf.debug.file)
  , records = conf.logbuffer.records
  , json = rc.log.debug.json
  , lines = rc.log.debug.lines
  , interactive = rc.log.debug.interactive
  , always = rc.log.debug.always
  , clean = rc.log.debug.clean
  , opts;

  if(always || code > 0) {
    var writes = always
      || (interactive && conf.interactive && errs.length)
      || !conf.interactive && errs.length;
    if(writes) {
      var fd = fs.openSync(file, 'w+');
      if(json) {
        // print the array as json
        if(!lines) {
          fs.writeSync(fd,
            stringify(records, null, req.rc.log.debug.indent || 2));
        // print newline delimited json records (bunyan compatible)
        }else{
          records.forEach(function(record) {
            // bunyan wants a string stack not an array
            if(record.err && record.err.stack) {
              record.err.stack = record.err.stack.join(EOL);
            }
            fs.writeSync(fd, stringify(record, undefined, 0) + EOL);
          })
        }
      // raw non-json style
      }else{
        records.forEach(function(record) {
          opts = {
            name: name,
            msg: record.message || record.msg,
            parameters: record.parameters,
            record: record,
            pad: true
          }
          fs.writeSync(fd, pp.toString(opts));
        })
      }
      fs.closeSync(fd);
    }
  }else{
    if(clean) {
      try{
        fs.unlinkSync(file);
      }catch(e){}
    }
  }
}

module.exports = debug;
