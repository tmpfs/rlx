var util = require('util');
var utils = require('cli-util');

/**
 *  Render a progress bar to the stderr stream.
 *
 *  Note:
 *
 *  1) Tried node-progress, renders extraneous newlines.
 *  2) SIGWINCH does not fire on OSX 10.6.8/zsh/iTerm2.
 *  3) node resize event does not fire.
 */
module.exports = function progress(options) {
  options = options || {};
  var stream = options.stream || process.stderr;
  // don't render progress bars if not a tty
  if(!stream.isTTY) return function noop(){};
  var cols = Math.min(options.columns || stream.columns, options.clamp || 80);
  var prefix = options.prefix || 'put';
  var complete = options.complete || '=';
  var incomplete = options.incomplete || ' ';
  var start = new Date();

  var formats = {
    prefix: ':prefix',
    percent: ':percent',
    eta: ':eta'
  }
  var barfmt = ':bar';

  var max = {
    prefix: cols / 4,
    percent: '100.00%'.length
  }

  var curr = 0;

  var format = options.format ||
    ':prefix [:bar] :percent (:eta)';

  function replace(amount, format, tokens) {
    var str = format, k;
    if(tokens.prefix.length < max.prefix) {
      tokens.prefix = tokens.prefix.substr(0, max.prefix);
    }
    if(tokens.percent.length < max.percent) {
      tokens.percent = utils.pad(tokens.percent, max.percent, true);
    }
    for(k in formats) {
      str = str.replace(formats[k], tokens[k]);
    }
    var available = cols - (str.length - barfmt.length);
    var chars = utils.repeat(Math.round(amount * available), complete);
    chars = utils.pad(chars, available, false);
    str = str.replace(barfmt, chars);
    return str;
  }

  /**
   *  Render the progress bar.
   *
   *  @param amount A normalized amount between zero and one.
   *  @param end A boolean indicating that progress is complete.
   */
  return function bar(amount, length, total, end) {
      var elapsed = new Date() - start;
      var percent = (amount * 100).toFixed(2) + '%';
      var eta = Math.abs(end ? 0 : elapsed * (total / curr - 1));
      eta = (isNaN(eta) || !isFinite(eta))
        ? '0.0' : (eta / 1000).toFixed(1) + 's';
      curr += length;
      var tokens = {
        prefix: prefix,
        percent: percent,
        eta: eta
      }
      var str = replace(amount, format, tokens);
      stream.clearLine();
      stream.cursorTo(0);
      stream.write(str);
      if(end === true) {
        stream.clearLine();
        stream.cursorTo(0);
        //stream.write('\n');
      }
  }
}
