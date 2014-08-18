var descriptor = {
  _id: {type: 'string', required: true},
  name: {type: 'string', required: true},
  password: {type: 'string', required: true},
  roles: {type: 'array', required: true},
  type: {type: 'string', enum: ['user']}
}

module.exports = descriptor;
