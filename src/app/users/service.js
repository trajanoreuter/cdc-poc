function usersService ({ usersRepository }) {
  async function createUser (data) {
    return usersRepository.create(data)
  }

  return {
    createUser,
  }
}

module.exports = usersService
