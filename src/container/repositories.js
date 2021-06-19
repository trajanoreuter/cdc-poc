const { asFunction } = require('awilix')

const {
  usersPostgresRepository,
} = require('../repositories/postgres')

function register (container) {
  container.register({
    usersRepository: asFunction(usersPostgresRepository).singleton(),
  })
}

module.exports = register
