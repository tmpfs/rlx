var fs = require('fs');
var path = require('path');
var template = require('../../util/template');
var design = require('../../util/design');
var resolve = require('../../util/resolve');
var mkdirs = require('../../util/mkdirs');
var ncp = require('ncp').ncp
  , mkdirp = require('mkdirp');

function filter(file) {
  var re = /(\.gitignore|\.npmignore)$/;
  return !re.test(file);
}

module.exports = function init(info, req, next) {
  var scope = this;
  var errors = this.errors, name = this.template || info.args[0];
  var force = this.force, log = this.log, source, destination;
  var target = info.args[this.template ? 0 : 1];

  if(!name && !target) {
    target = req.dirs.user.template;
  }else if(!target){
    target = process.cwd();
  }
  target = resolve(target);

  var options = {clobber: force, filter: filter, name: name};

  function copy(options, source, destination) {
    log.debug('%s => %s', source, destination);
    fs.exists(destination, function(exists) {
      if(exists && !force) {
        return req.error(scope.wrap(errors.EFS_FILE_EXISTS,
          [destination, scope.options().force.toString(null)]),
          req, next);
      }
      ncp(source, destination, options, function(errs) {
        if(errs) return req.error(errs[0], req, next);
        //log.info('created %s', destination);
        var doc = {
          ok: true,
          file: destination,
          source: source
        }
        req.print(doc, req, next);
      });
    });
  }

  if(!name) {
    source = req.dirs.tpl.system;
    destination = req.dirs.user.template;
    fs.exists(req.dirs.user.home, function(exists) {
      if(!exists) {
        mkdirp(req.dirs.user.home, function(err) {
          if(err) return req.error(err, req, next);
          copy(options, source, destination);
        })
      }else{
        copy(options, source, destination);
      }
    })
  }else{
    var isDesign = design.matches(name);
    if(isDesign) {
      this.glob.unshift(name + design.glob.wildcard);
    }else{
      this.glob.unshift(name + design.glob.javascript);
    }
    var opts = {
      patterns: this.glob,
      dirs: [req.dirs.tpl.system]
    };

    function copyFile(pth, options, source, destination) {
      // need to create parents when dealing with a single file
      mkdirs(target, pth, function(err) {
        if(err) return req.error(err, req, next);
        copy(options, source, destination);
      });
    }

    function copyDirectory(options, source, destination) {
      copy(options, source, destination);
    }

    template.fsref.call(this, {name: name}, function(doc) {
      if(doc.exists) {
        source = doc.file;
        var pth = path.basename(source);
        var known = '.rlx/template/', ind = source.indexOf(known)
        if(~ind) {
          pth = source.substr(ind + known.length);
        }else{
          // create the entire parent hierarchy in target
          // not much else we can do at this point
          // as we do not know where the template file/directory
          // is relative to
          pth = path.dirname(source);
        }
        if(design.matches(pth) && doc.stat.isDirectory()) {
          pth = design.strip(pth);
        }
        destination = path.join(target, pth);
        if(doc.stat.isFile()) {
          return copyFile(pth, options, source, destination);
        }
        return copyDirectory(options, source, destination);
      }
      template.list.call(this, req, opts, function(err, list, unique) {
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
          destination, tpl ? tpl.path : path.basename(source));

        if(tpl) {
          copyFile(tpl.path, options, source, destination);
        }else{
          copyDirectory(options, source, destination);
        }
      })
    });
  }
}
