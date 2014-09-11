var cdb = require('cdb');
var jar = require('../../../lib/jar');
var dbh = new cdb({jar: jar});
var mock = require('../mock');

var doc = {
  add: function(opts, cb){
    if(typeof opts === 'function') {
      cb = opts;
      opts = null;
    }
    opts = opts || {};
    opts.server = opts.server || mock.server.default;
    opts.db = opts.db || mock.database.default;
    opts.id = opts.id || mock.document.id;
    opts.body = opts.body || {_id: mock.document.id};
    dbh.doc.add(opts, cb);
  }
}

module.exports = doc;
