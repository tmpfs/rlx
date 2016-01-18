module.exports = {
  type: 'object',
  fields: {
    bail: {type: 'boolean'},
    interactive: {type: 'boolean'},
    server: {type: 'string'},
    database: {type: 'string'},
    exec: {type: 'array', required: true}
  }
}
