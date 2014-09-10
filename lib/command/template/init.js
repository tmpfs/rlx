var fs = require('fs');
var path = require('path');
var dirs = require('./dirs');
var template = require('../../util/template');
var design = require('../../util/design');
var resolve = require('../../util/resolve');
var copy = require('../../util/copy');

module.exports = function init(info, req, next) {

  var scope = this, nm = this.name();
  var errors = this.errors, name = this.template || info.args[0];
  var force = this.force, log = this.log, source, destination;
  var target = info.args[this.template ? 0 : 1];
  var oname = null;

  if(this.template && info.args.length === 2) {
    oname = info.args[1];
  }else{
    oname = info.args[2];
  }

  if(!name && !target) {
    // copying to user template directory
    target = req.dirs.user.template;
  }else if(!target){
    // copying to current working directory
    target = process.cwd();
  }

  target = resolve(target);
  //console.dir(target);

  var options = {
    ncp: {clobber: force}, name: name, rename: oname};

  if(!name) {
    options.source = req.dirs.tpl.system;
    options.destination = req.dirs.user.template;
    copy.call(scope, info, req, next, options);
  }else{
    var isDesign = design.matches(name);
    if(isDesign) {
      this.glob.unshift(name + design.glob.wildcard);
    }else{
      this.glob.unshift(name + design.glob.javascript);
    }

    var opts = {
      patterns: this.glob,
      dirs: dirs.call(this, req)
    };

    template.fsref.call(this, {name: name}, function(doc) {
      if(doc.exists) {
        source = doc.file;
        var pth = path.basename(source);
        var known = '.' + nm + '/template/', ind = source.indexOf(known)
        if(~ind) {
          pth = source.substr(ind + known.length);
        }else{
          // create the entire parent hierarchy in target
          // not much else we can do at this point
          // as we do not know where the template file/directory
          // is relative to
          pth = path.dirname(source);
        }
        destination = path.join(target, pth);
        options.source = source;
        options.destination = destination;
        if(doc.stat.isFile()) {
          return copy.call(scope, info, req, next, options);
        }
        return copy.call(scope, info, req, next, options);
      }

      template.list.call(scope, req, opts, function(err, list, unique) {
        if(err) return req.error(err, req, next);
        var tpl = template.find(name, unique);
        var keys = Object.keys(unique);
        if(!keys.length && !tpl) {
          return req.error(errors.EUNKNOWN_TEMPLATE, req, next, [name]);
        }
        source = tpl ? tpl.file : null;
        destination = target;

        // deal with design document (application) paths
        if(!source) {
          source = list[req.dirs.tpl.system][0].file;
          var len = (req.dirs.tpl.system + name).length + 1;
          source = source.substr(0, len);
        }
        destination = path.join(
          destination, tpl ? tpl.path : design.prepend(path.basename(source)));

        options.source = source;
        options.destination = destination;
        copy.call(scope, info, req, next, options);
      })
    });
  }
}
