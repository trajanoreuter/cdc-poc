function application ({
  logger,
  config,
  postgresDatabase,
  createKafkaConsumer,
}) {
  async function start () {
    logger.info({
      message: 'Starting application',
    })

    await postgresDatabase.start()

    const {
      usersTopic,
      todosTopic,
    } = config.kafka.app

    createKafkaConsumer.start({ consumerTopic: usersTopic })
    createKafkaConsumer.start({ consumerTopic: todosTopic })
  }

  async function stop () {
    logger.info({
      message: 'Stopping application',
    })

    await postgresDatabase.stop()
  }

  return {
    start,
    stop,
  }
}

module.exports = application
