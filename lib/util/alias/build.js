function build(opts) {
  var o = {};
  o.server = opts ? opts.server : this.server || undefined;
  o.database = opts ? opts.database : this.database || undefined;
  o.id = opts ? opts.id : this.id || undefined;
  o.rev = opts ? opts.rev : this.rev || undefined;

  // we want to be able to iterate on the keys cleanly
  if(!o.server) delete o.server;
  if(!o.database) delete o.database;
  if(!o.id) delete o.id;
  if(!o.rev) delete o.rev;

  return o;
}

module.exports = build;
