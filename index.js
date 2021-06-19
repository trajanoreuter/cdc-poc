const faker = require('faker')

const container = require('./src/container')

async function main () {
  const {
    logger,
    application,
    usersService,
  } = container.cradle

  try {
    await application.start()

    await usersService.createUser({
      name: faker.name.findName(),
      email: faker.internet.email(),
    })
  } catch (error) {
    logger.fatal({
      message: 'Unexpected application behavior',
      error: error.message,
      stack: error.stack,
    })
  }
}

main()
