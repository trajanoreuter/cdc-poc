const { asFunction } = require('awilix')

const {
  envApply,
} = require('../aws')

function register (container) {
  container.register({
    envApply: asFunction(envApply),
  })
}

module.exports = register
