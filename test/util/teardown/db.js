var cdb = require('cdb');
var jar = require('../../../lib/jar');
var dbh = new cdb({jar: jar});
var mock = require('../mock');

var db = {
  rm: function(opts, cb){
    if(typeof opts === 'function') {
      cb = opts;
      opts = null;
    }
    opts = opts || {};
    opts.server = opts.server || mock.server.default;
    opts.db = opts.db || mock.database.default;
    dbh.db.rm(opts, cb);
  }
}

module.exports = db;
