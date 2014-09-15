var fs = require('fs')
  , path = require('path')
  , stringify = require('./stringify')
  , pp = require('./pp');

function debug(code, req) {
  var conf = this.configure()
  // too early nothing to collect
  if(!conf || !conf.logbuffer) return;

  var log = this.log
  , name = this.name()
  , errs = conf.errors || []
  , file = path.join(process.cwd(), conf.debug.file)
  , records = conf.logbuffer.records
  , json = req.rc.log && req.rc.log.debug && req.rc.log.debug.json
  , always = req.rc.log && req.rc.log.debug && req.rc.log.debug.always
  , clean = req.rc.log && req.rc.log.debug && req.rc.log.debug.clean
  , contents = '', opts;

  if(code > 0 || always) {
    var writes = always || !conf.interactive && errs.length;
    if(writes) {
      if(json) {
        contents = stringify(records, null, req.rc.log.debug.indent || 2);
      }else{
        records.forEach(function(record) {
          //record.id = log.names(record.level);
          opts = {
            name: name,
            msg: record.message || record.msg,
            parameters: record.parameters,
            record: record,
            pad: true
          }
          //console.dir(opts.parameters);
          //console.dir(record);
          contents += pp.toString(opts);
        })
      }
      fs.writeFileSync(file, contents);
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
