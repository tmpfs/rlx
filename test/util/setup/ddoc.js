var cdb = require('cdb');
var dbh = new cdb();
var mock = require('../mock');

var ddoc = {
  add: function(opts, cb){
    if(typeof opts === 'function') {
      cb = opts;
      opts = null;
    }
    opts = opts || {};
    opts.server = opts.server || mock.server.default;
    opts.db = opts.db || mock.database.default;
    opts.ddoc = opts.ddoc || mock.app.ddoc;
    opts.body = opts.body || {language: 'javascript'};
    dbh.design.add(opts, cb);
  }
}

module.exports = ddoc;
