var fs = require('fs');
var path = require('path');

var property = require('cli-property')
  , find = property.find;
var coerce = require('cli-native');
var stringify = require('../../util/stringify');
var write = require('../../util/write');

module.exports = function set(info, req, next){
  var scope = this, errors = this.errors;
  var target = req.rc;
  var key = info.args[0];
  var value = info.args[1];
  var deleting = value === undefined;
  if(!key) {
    return req.error(errors.ERC_KEY_REQUIRED, req, next);
  }else if(!value && !info.rm) {
    return req.error(errors.ERC_VALUE_REQUIRED, req, next);
  }
  var file = path.join(req.dirs.user.home, req.runcontrol.name);
  fs.exists(file, function(exists) {
    if(!exists) {
      return req.error(errors.ERC_FILE_REQUIRED, req, next, [file, 'rc init']);
    }
    var val;
    try{
      val = coerce.to(value, ',', true);
    }catch(e) {
      return req.error(
        errors.ERC_VALUE_PARSE, req, next, [e.message.toLowerCase()]);
    }
    //console.dir(val);
    var result = find(key, target, {create: true});
    var doc = {
      key: result.key,
      path: result.path,
      value: result.value,
      file: file};
    if(!deleting) {
      result.parent[result.key] = val;
      doc.before = doc.value;
      doc.value = val;
    }else{
      delete result.parent[result.key];
    }
    var opts = {output: file};
    var contents = stringify(target, null, req.rc.indent);
    write.call(scope, contents, req, opts, function(err) {
      /* istanbul ignore if  */
      if(err) return req.error(err, req, next);
      doc.ok = true;
      if(deleting) {
        doc.deleted = true;
      }
      req.print(doc, req, next);
    })
  });
}
