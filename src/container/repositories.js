const { asFunction } = require('awilix')

const {
  usersPostgresRepository,
  todosPostgresRepository,
} = require('../repositories/postgres')

function register (container) {
  container.register({
    usersRepository: asFunction(usersPostgresRepository).singleton(),
    todosRepository: asFunction(todosPostgresRepository).singleton(),
  })
}

module.exports = register
