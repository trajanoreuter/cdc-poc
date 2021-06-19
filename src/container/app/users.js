const { asFunction } = require('awilix')

const {
  usersSchema,
  usersService,
} = require('../../app/users')

function register (container) {
  container.register({
    usersSchema: asFunction(usersSchema),
    usersService: asFunction(usersService),
  })
}

module.exports = register
