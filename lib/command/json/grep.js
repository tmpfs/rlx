var json = require('../../util/json');

module.exports = function grep(info, req, next) {
  var scope = this
    , errors = this.errors
    , long = this.long;
  var opts = {body: req.document.body};

  if(!info.args.length) {
    return req.error(
      this.errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }

  // fetching patterns modifies info.args
  var patterns = json.patterns.call(this, info, req);
  if(!patterns.length) {
    return req.error(
      this.errors.ENO_PATTERNS_FOUND, req, next, []);
  }

  if(!info.args.length && !opts.body) {
    return req.error(errors.EFILE_INPUT_REQUIRED, req, next);
  }

  opts.files = info.args.slice(0);

  json.load.call(this, opts, function(err, list) {
    if(err) return req.error(err, req, next);
    if(!list.length) {
      return req.error(errors.EFILE_INPUT_REQUIRED, req, next);
    }
    json.grep.call(scope, {list: list, patterns: patterns},
      function(err, results) {
        if(err) return req.error(err, req, next);
        if(!long) {
          results = results.map(function(match) {
            return match.value;
          })
        }
        req.print(results, req, next);
      }
    );
  });
}
