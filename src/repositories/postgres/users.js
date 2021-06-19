function usersPostgresRepository ({
  postgresDatabase,
  usersSchema,
}) {
  const { Users } = postgresDatabase.sequelize.models

  async function create (data) {
    const user = await Users
      .create(usersSchema.serializeToPostgres(data))

    return usersSchema.serializeFromPostgres(user)
  }

  return {
    create,
  }
}

module.exports = usersPostgresRepository
