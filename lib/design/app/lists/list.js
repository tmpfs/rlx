module.exports = function(head, req) {
  start({
    'headers': {
      'Content-Type': 'application/json'
    }
  });
  var doc = [], row;
  while(row = getRow()){
    doc.push(row);
  }
  send(toJSON(doc));
}
