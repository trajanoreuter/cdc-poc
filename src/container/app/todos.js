const { asFunction } = require('awilix')

const {
  todosSchema,
  todosService,
} = require('../../app/todos')

function register (container) {
  container.register({
    todosSchema: asFunction(todosSchema),
    todosService: asFunction(todosService),
  })
}

module.exports = register
