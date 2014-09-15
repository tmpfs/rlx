var fs = require('fs')
  , path = require('path')
  , stringify = require('./stringify');

function debug(code, req) {
  if(code > 0) {
    var conf = this.configure()
      , file = path.join(process.cwd(), conf.debug.file)
      , records = conf.logbuffer.records
      , json = req.rc.log && req.rc.log.debug && req.rc.log.debug.json
      , contents = '';

    if(json) {
      contents = stringify(records, null, req.rc.log.debug.indent || 2);
    }

    //console.dir(file);
    //console.dir(req.rc.log.debug.json);

    fs.writeFileSync(file, contents);
  }
}

module.exports = debug;
