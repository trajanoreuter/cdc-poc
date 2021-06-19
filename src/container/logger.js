const { asFunction } = require('awilix')

const logger = require('../logger')

function register (container) {
  container.register({
    logger: asFunction(logger),
  })
}

module.exports = register
