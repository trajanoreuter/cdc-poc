const { asValue } = require('awilix')

const config = require('../../config')

function register (container) {
  container.register({
    config: asValue(config),
  })
}

module.exports = register
