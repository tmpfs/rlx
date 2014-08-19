var Couch = require('../util/couch');
var MAX_DB_CALL_STACK = 32;

var dbh;

function db(options) {
  if(!dbh || options) {
    options = options || {server: this.server};
    dbh = new Couch(options);
  }
  return dbh;
}

function add(req, err, res, opts, doc) {
  var calls = req.db.calls = req.db.calls || [];
  calls.push({err: err, res: res, opts: opts, doc: doc});
  if(calls.length > MAX_DB_CALL_STACK) calls.shift();
}

module.exports = db;
module.exports.add = add;
