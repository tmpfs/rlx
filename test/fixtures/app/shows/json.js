module.exports = function(doc, req) {
  if (!doc) {
    return {json: {error: 'missing', reason: 'no document to show'}}
  } else {
    return {json: doc}
  }
}
