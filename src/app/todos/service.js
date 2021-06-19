function todosService ({ todosRepository }) {
  async function createTodo (data) {
    return todosRepository.create(data)
  }

  return {
    createTodo,
  }
}

module.exports = todosService
