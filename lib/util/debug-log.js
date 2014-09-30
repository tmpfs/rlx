var fs = require('fs')
  , util = require('util')
  , os = require('os')
  , EOL = os.EOL
  , path = require('path')
  , stringify = require('./stringify')
  , pp = require('./pp');

var errprefix = 'ERR! [ error] ';

function writeVerboseError(fd, records, err, opts) {
  opts = opts || {};
  prefix = opts.prefix + errprefix;
  if(records.length) {
    fs.writeSync(fd, prefix + EOL);
  }
  fs.writeSync(fd, prefix + util.format('%s (%s)', err.key, err.code) + EOL);
  fs.writeSync(fd, prefix + EOL);
  fs.writeSync(fd,
    prefix + util.format(err.message, err.parameters || []) + EOL);
  var stack = pp.getStack({err: err});
  if(stack) {
    stack.forEach(function(line) {
      fs.writeSync(fd, prefix + util.format('  %s', line) + EOL);
    })
  }
  fs.writeSync(fd, prefix + EOL);
}

function debug(code) {
  var conf = this.configure()

  // too early nothing to collect
  if(!conf || !conf.logbuffer) return;

  var log = this.log
  , name = this.name()
  , rc
  , errs = conf.errors || []
  , file = path.join(process.cwd(), conf.debug.file)
  , records = conf.logbuffer.records


  if(conf.rc && conf.rc.info) {
    rc = conf.rc.info.rc;
  }

  // cannot operate, likely test environment with rc disabled
  if(!rc) return false;

  var json = rc.log.debug.json
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

        var prefix = name + ' | ';
        var header = util.format(
          prefix + '%s (%s) started on %s',
          'v' + this.version(), os.hostname(), conf.start.time) + EOL;

        fs.writeSync(fd, header);

        if(errs.length && records.length) {
          var err = errs[errs.length - 1];
          var rerr = records[records.length - 1].err;
          if(err && rerr && err.key === rerr.key) {
            records.pop();
          }
        }

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

        // might not have errors if always
        if(errs.length) {
          writeVerboseError(
            fd, records, errs[errs.length - 1], {prefix: prefix});
        }

        var fmsg = util.format(
          errprefix + 'code %s (%sok) %s error%s',
          code,
          code !== 0 ? 'not ' : '',
          errs.length,
          errs.length > 1 ? 's' : '' ) + EOL;

        fs.writeSync(fd, prefix + fmsg);
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
