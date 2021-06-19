const { asFunction } = require('awilix')

const postgresDatabase = require('../database/postgres')

function register (container) {
  container.register({
    postgresDatabase: asFunction(postgresDatabase).singleton(),
  })
}
module.exports = register
