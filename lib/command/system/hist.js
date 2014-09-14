module.exports = function hist(info, req, next) {
  var hist = this.configure().history.store.history().slice(0);

  // this command has already been added to the history
  // which isn't really too convenient
  hist.shift();

  // better to see more recent commands at the bottom
  hist.reverse();

  req.print(hist, req, next);
}
