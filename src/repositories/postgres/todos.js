function todosPostgresRepository ({
  postgresDatabase,
  todosSchema,
}) {
  const { Todos } = postgresDatabase.sequelize.models

  async function create (data) {
    const todo = await Todos
      .create(todosSchema.serializeToPostgres(data))

    return todosSchema.serializeFromPostgres(todo)
  }

  return {
    create,
  }
}

module.exports = todosPostgresRepository
