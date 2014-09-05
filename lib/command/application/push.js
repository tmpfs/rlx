var async = require('async');
var uuid = require('uuid');
var validate = require('../../util/validate');
var descriptor = require('cdb').schema.design;
var design = require('../../util/design');
var docs = require('../../util/docs');
var upload = require('../../util/attach').up;

module.exports = function push(info, req, next) {
  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }

  if(!this.id) {
    // TODO: use --id OR --ddoc error message
    return req.error(this.errors.EID_REQUIRED, req, next);
  }

  var scope = this, errors = this.errors;
  var name = this.template || 'full';
  var opts = req.db.options(
    req, {db: this.database, id: this.id, ddoc: this.ddoc, uuid: uuid});
  var dbh = req.db();

  // push/deploy force recursive behaviour by default
  if(this.recursive === undefined) {
    this.recursive = true;
  }

  function complete(err, res, doc) {
    if(!info.callback && err) return req.error(err, req, next);
    info.callback ? next(err, res, doc) : req.print(doc, req, next);
  }

  function collate(tpl) {
    design.collate.call(this, tpl, req, function(err, result) {
      if(err) return req.error(err, req, next);
      var doc = result.design;
      var attachments = result.attachments;

      function attach(cb) {
        upload.call(scope, {files: attachments}, info, req, next,
          function(err, res, attdoc) {
            cb(err, attdoc);
          });
      }

      function updocs(cb) {
        docs.collate.call(scope, result.docs, req, function(err, results) {
          var options = {
            list: results,
            map: result.docs
          };
          docs.save.call(scope, options, info, req, function(err, doc) {
            //console.dir('docs save complete');
            //console.dir(doc);
            cb(err, doc);
          })
        })
      }

      // this is a quick hack to bypass the problem
      // if multiple validate_doc_update functions in
      // a database during test execution
      // some of the files are included in the code
      // coverage and couchdb generates a 500 response on
      // invalid javascript
      if(process.env.NODE_ENV === 'test') {
        delete doc.validate_doc_update;
      }
      //console.dir(doc);
      //console.dir(result);
      //console.dir(result.design);
      validate.call(this, doc, descriptor, function(errors, fields) {
        if(errors && errors.length) {
          return req.error(errors[0], req, next);
        }
        doc._id = dbh.design.prefix(this.id);
        opts.body = doc;
        var method = info.deploy ? 'deploy' : 'save', methods;
        dbh.design[method](opts, function(err, res, doc) {
          if(req.auth(info, req, err)) {
            return;
          }
          if(!info.callback && err) return req.error(err, req, next);
          var methods = [];
          // upload attachments
          if(attachments.length || result.docs) {
            if(attachments.length) methods.push(attach);
            if(result.docs) methods.push(updocs);
            async.eachSeries(methods, function(func, callback) {
              func.call(scope, callback);
            }, function(err, results) {
              complete(err, res, doc);
            })
          }else{
            complete(err, res, doc);
          }
        })
      })
    });
  }

  var dir = info.args[0] ? info.args[0] : null;
  if(dir) {
    design.directory.call(this, dir, req, function(err, tpl) {
      if(err) return req.error(err, req, next);
      collate.call(this, tpl);
    });
  }else{
    design.list.call(this, req, function(err, list, unique) {
      if(err) return req.error(err, req, next);
      var tpl = design.find(name, unique);
      if(!tpl) {
        return req.error(errors.EUNKNOWN_TEMPLATE, req, next, [name]);
      }
      collate.call(this, tpl);
    })
  }
}
