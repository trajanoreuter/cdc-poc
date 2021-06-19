const { asFunction } = require('awilix')

const application = require('../../app')

function register (container) {
  container.register({
    application: asFunction(application),
  })
}

module.exports = register
