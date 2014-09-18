var ansi = require('ttycolor').ansi
  , url = require('url');

function colors() {
  var scope = this;
  return function colorlist() {
    return {
      //prefix: function(name, delimiter) {
        //var space = ' ';
        //var colored = name + space + ansi(delimiter).cyan.valueOf(true);
        //colored = ansi(colored).bg.black.valueOf(true)
        //return {
          //value: name + space + delimiter + space, color: colored + space}
      //},
      parameters: function(a) {
        return a.slice(0).map(function(v) {
          if(!v) return v;
          return ansi(v).underline.valueOf(true);
        })
      },
      name: function(v) {
        if(!v) return v;
        return ansi(v).normal.valueOf(true);
      },
      delimiter: function(v) {
        if(!v) return v;
        return ansi(v).cyan.valueOf(true);
      },
      health: function(v) {
        if(!v) return v;
        var secure = url.parse(scope.server || '').protocol === 'https:';
        color = secure ? 'green' : 'red';
        return ansi(v)[color].valueOf(true);
      },
      default: function(v) {
        if(!v) return v;
        return ansi(v).underline.valueOf(true);
      },
      location: function(v) {
        if(!v) return v;
        return ansi(v).blue.valueOf(true);
      }
    }
  }
}

module.exports = colors;
