module.exports = function exit(info, req, next) {
  var code = 0;
  var errs = this.configure().errors;
  if(errs && errs.length) {
    code = errs[errs.length - 1].code;
  }
  process.exit(code);
}
