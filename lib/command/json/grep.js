var json = require('../../util/json');

module.exports = function grep(info, req, next) {
  var scope = this
    , errors = this.errors
    , long = this.long
    , raw = this.raw
    , glob = this.glob;
  var opts = {body: req.document.body};

  if(!info.args.length) {
    return req.error(
      this.errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }

  // fetching patterns modifies info.args
  var patterns = json.patterns.call(this, info, req);
  //if(!patterns.length) {
    //return req.error(
      //this.errors.ENO_PATTERNS_FOUND, req, next, []);
  //}

  opts.files = json.files.call(this, info, req);

  if(!info.args.length && !opts.body && !opts.files.length) {
    return req.error(errors.EFILE_INPUT_REQUIRED, req, next);
  }

  var exec = {flat: this.flat, keys: this.keys, values: this.values};

  json.load.call(this, opts, function(err, list) {
    if(err) return req.error(err, req, next);
    if(!list.length) {
      return req.error(errors.EFILE_INPUT_REQUIRED, req, next);
    }
    var options = {
      list: list,
      patterns: patterns,
      lookups: info.args.slice(0),
      exec: exec,
      glob: glob
    };
    json.grep.call(scope, options,
      function(err, results) {
        if(err) return req.error(err, req, next);
        results = json.finalize.call(scope, results);
        if(typeof results === 'string' && raw) {
          req.text = true;
        }
        req.print(results, req, next);
      }
    );
  });
}
