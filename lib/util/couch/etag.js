function etag(headers) {
  var tag = headers.etag || '';
  return tag.replace(/^"/, '').replace(/"$/, '');
}

module.exports = etag;
