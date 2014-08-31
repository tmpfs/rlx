module.exports = function(doc, req) {
  doc.integer = typeof doc.integer === 'number' ? doc.integer++ : 0;
  return [doc];
}
