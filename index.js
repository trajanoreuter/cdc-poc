const container = require('./src/container')

async function main () {
  const {
    logger,
    application,
  } = container.cradle

  try {
    await application.start()
  } catch (error) {
    logger.fatal({
      message: 'Unexpected application behavior',
      error: error.message,
      stack: error.stack,
    })
  }
}

main()
