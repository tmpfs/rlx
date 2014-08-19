var Couch = require('../util/couch'), dbh;

function db(options) {
  if(!dbh || options) {
    options = options || {server: this.server};
    dbh = new Couch(options);
  }
  return dbh;
}

function add(req, err, res, opts, doc) {
  req.db.last = {err: err, res: res, opts: opts, doc: doc};
}

module.exports = db;
module.exports.add = add;
