var cdb = require('cdb');
var jar = require('../../../lib/jar');
var dbh = new cdb({jar: jar});
var mock = require('../mock');

var doc = {
  docs: [
    {_id: 'foo', list: []},
    {_id: 'bar', list: []},
    {_id: 'baz', list: []}
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
