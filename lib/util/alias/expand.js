var loc = require('../location');
var find = require('./find');


var fields = [
  'server',
  'database',
  'id',
  'rev',
  'username',
  'ddoc'
];

function expand(req, cb) {

  var match
    , ptn = req.rc.alias.match
    , aliases = this.configure().alias
    , i, v, a;

  // no aliases loaded cannot perform
  // alias expansion
  if(!aliases) return cb();

  try{
    match = new RegExp(ptn);
  }catch(e) {
    return cb(this.wrap(
      this.errors.EREGEXP_COMPILE, [ptn, 'alias.match'], e));
  }

  for(k in fields) {
    v = req.result.options[fields[k]];
    if(v && match.test('' + v)) {
      a = find(v.replace(match, ''), aliases);
      if(!a) {
        return cb(this.wrap(this.errors.EUNKNOWN_ALIAS, [v]));
      }
    }
  }

  // no aliases specified/found
  if(!a) return cb();

  // assign to the instance
  for(k in fields) {
    v = this[fields[k]];
    //console.log('instance %s = %s', k, v);
    if(a[fields[k]] && (!v || match.test(v))) {
      //console.log('assign %s', a[fields[k]]);
      this[fields[k]] = a[fields[k]];
    }
  }

  cb();
}

module.exports = expand;
