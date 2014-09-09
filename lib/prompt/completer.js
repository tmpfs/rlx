function completer(line, cb) {
  //console.log('line "%s"', line);
  var completions = [''];
  var val = line.trim();
  if(!val) {
    return cb(null, [completions, line]);
  }
  var parts = line.split(/\s+/);

  // completing on the word before the cursor
  var word = parts.pop();

  // top-level commands/options
  var cmds = this.commands();
  var opts = this.options();

  // get list of candidates
  function candidates(word, index) {
    var list = [], k, v, i, names;

    function match(cmds) {
      for(k in cmds) {
        v = cmds[k];
        // TODO: need to sort names
        names = v.names().reverse();
        for(i = 0;i < names.length;i++) {
          if(names[i].indexOf(word) === 0) {
            list.push(names[i]);
            break;
          }
        }
      }
    }

    // match on commands
    if(!/^-/.test(word)) {
      match(cmds);
    // match on options
    }else{
      //console.log('match on options');
      match(opts);
    }
    if(list.length === 1 && list[0] === word) {
      return completions;
    }
    return list;
  }

  var list = candidates(word, parts.length);
  //console.dir(list);
  completions = completions.concat(list);
  return cb(null, [completions, line]);
}

module.exports = completer;
