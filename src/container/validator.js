const { asFunction } = require('awilix')

const validator = require('../validator')

function register (container) {
  container.register({
    validator: asFunction(validator),
  })
}

module.exports = register
