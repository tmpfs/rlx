var cdb = require('cdb');
var dbh = new cdb();
var mock = require('../mock');

var doc = {
  docs: [
    {_id: 'foo'},
    {_id: 'bar'},
    {_id: 'baz'}
  ]
};

var bulk = {
  add: function(opts, cb){
    if(typeof opts === 'function') {
      cb = opts;
      opts = null;
    }
    opts = opts || {};
    opts.server = opts.server || mock.server.default;
    opts.db = opts.db || mock.database.default;
    opts.body = opts.body || doc;
    dbh.db.bulk(opts, cb);
  }
}

module.exports = bulk;
