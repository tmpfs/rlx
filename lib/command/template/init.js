var path = require('path');
var template = require('../../util/template');
var design = require('../../util/design');
var resolve = require('../../util/resolve');
var mkdirs = require('../../util/mkdirs');
var ncp = require('ncp').ncp;

module.exports = function init(info, req, next) {
  var errors = this.errors, name = this.template || info.args[0];
  var force = this.force;
  //console.dir(req.dirs);
  var target = info.args[1] || process.cwd();
  target = resolve(target);

  // TODO: validate output directory is an existing directory

  if(!info.args.length || !name) {
    console.log('copy from system templates (all) to user templates');
    next();
  }else{
    if(!name) {
      return req.error(errors.ETEMPLATE_REQUIRED, req, next);
    }
    var isDesign = name.indexOf('design/') === 0, ddoc;
    if(isDesign) {
      this.glob.unshift(name + '/**');
      ddoc = name.replace(/^design\//, '');
    }else{
      this.glob.unshift(name + '*.js');
    }

    var opts = {
      patterns: this.glob.length ? this.glob : null,
      dirs: [req.dirs.tpl.system]};
    template.list.call(this, req, opts, function(err, list, unique) {
      if(err) return req.error(err, req, next);
      //console.dir(list);
      var tpl = template.find(name, unique);
      var keys = Object.keys(unique);
      if(!keys.length && !tpl) {
        return req.error(errors.EUNKNOWN_TEMPLATE, req, next, [name]);
      }
      var source = tpl ? tpl.file : null, destination = target;
      if(!source) {
        source = list[req.dirs.tpl.system][0].file;
        var len = (req.dirs.tpl.system + name).length + 1;
        source = source.substr(0, len);
      }
      destination = path.join(
        destination, tpl ? tpl.path : path.basename(source));
      function filter(file) {
        var re = /(\.gitignore|\.npmignore)$/;
        return !re.test(file);
      }

      //console.log('source %s', source);
      //console.log('destination %s', destination);

      var options = {clobber: force, filter: filter}
      function copy() {
        ncp(source, destination, options, function(errs) {
          if(errs) return req.error(errs[0], req, next);
          console.info('created %s', destination);
          next();
        });
      }

      if(tpl) {
        mkdirs(target, tpl.path, function(err) {
          if(err) return req.error(err, req, next);
          copy();
        });
      }else{
        copy();
      }
    })
  }
}
