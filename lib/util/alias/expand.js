var loc = require('../location');
var find = require('./find');


var fields = [
  'server',
  'database',
  'id',
  'rev',
  'username',
  //'ddoc'
];

function expand(req, cb) {
  var match = req.rc.alias.match
    , aliases = this.configure().alias
    , i, v, a;

  // no aliases loaded cannot perform
  // alias expansion
  if(!aliases) return cb();

  for(k in fields) {
    v = req.result.options[fields[k]];
    if(v && match.test('' + v)) {
      //console.dir(v)
      a = find(v.replace(match, ''), aliases);
      if(!a) {
        return cb(this.wrap(this.errors.EUNKNOWN_ALIAS, [v]));
      }
    }
  }

  // no aliases specified/found
  if(!a) return cb();

  // assign to the instance
  assign.call(this, a, match);

  cb();
}

function assign(a, match) {
  var k, v;
  for(k in fields) {
    v = this[fields[k]];
    //console.log('assign from alias %s', v);
    if(a[fields[k]] && (!v || match.test(v))) {
      //console.log('assigning %s', v);
      this[fields[k]] = a[fields[k]];
    }
  }
}

expand.assign = assign;

module.exports = expand;
