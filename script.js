const faker = require('faker')

const container = require('./src/container')

async function script () {
  const {
    logger,
    usersService,
    todosService,
  } = container.cradle

  async function task () {
    const user = await usersService.createUser({
      name: faker.name.findName(),
      email: faker.internet.email(),
    })

    const { id } = user

    await todosService.createTodo({
      todo: faker.hacker.phrase(),
      userId: id,
    })
  }

  try {
    logger.info({
      message: 'Running script populating tables',
    })

    const tasks = []

    for (let i = 0; i < 10; i += 1) {
      tasks.push(task())
    }
    await Promise.all(tasks)

    logger.info({
      message: 'Done',
    })
  } catch (error) {
    logger.fatal({
      message: 'Unexpected script behavior',
      error: error.message,
      stack: error.stack,
    })
  }
}

script()
