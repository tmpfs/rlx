function pretty(name, log, err) {
  var prefix = '%s ! '
    , indent = '  '
    , stack = err.stack || [];

  function print(message, parameters) {
    parameters = parameters.slice(0)
    message = prefix + message;
    parameters.unshift(name);
    console.error.apply(
      console, [message].concat(parameters));
  }

  print('%s (%s) %s', [err.key, err.code, err.time]);
  print(indent + err.message, err.parameters);
  stack.forEach(function(line) {
    print(indent + indent + line, []);
  })
}

module.exports = function err(info, req, next) {
  var errors = this.configure().errors || []
    , log = this.log
    , raw = this.raw
    , scope = this
    , name = this.name();

  if(!errors.length || !raw) {
    return req.print(errors, req, next);
  }else{
    errors.forEach(function(err) {
      pretty.call(scope, name, log, err);
    })
  }
  next();
}
