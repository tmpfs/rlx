var template = require('../../util/template');
var design = require('../../util/design');

module.exports = function init(info, req, next) {
  var errors = this.errors, name = this.template || info.args[0];
  //console.dir(req.dirs);
  if(!info.args.length) {
    console.log('copy from system templates (all) to user templates');
    next();
  }else{
    if(!name) {
      return req.error(errors.ETEMPLATE_REQUIRED, req, next);
    }
    var isDesign = name.indexOf('design/') === 0;
    if(isDesign) {
      this.glob.push(name + '/**');
    }

    var opts = {
      patterns: this.glob.length ? this.glob : null,
      dirs: [req.dirs.tpl.system]};
    template.list.call(this, req, opts, function(err, list, unique) {
      if(err) return req.error(err, req, next);
      var tpl = template.find(name, unique);
      var keys = Object.keys(unique);
      if(isDesign && !keys.length || !tpl && !isDesign) {
        return req.error(errors.EUNKNOWN_TEMPLATE, req, next, [name]);
      }
      if(tpl) {
        //return req.print(fs.createReadStream(tpl.file), req, next);
        console.log('init on template file source');
        next();
      }else if(isDesign) {
        console.log('init from named template');
        next();
        //design.get.call(this, name, info, req, function(err, result) {
          //if(err) return req.error(err, req, next);
          //req.print(result.design, req, next);
        //})
      }else{
        // should never get here
        next();
      }
    })
  }
}
