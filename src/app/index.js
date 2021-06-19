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
      userTopic,
    } = config.kafka.app
    createKafkaConsumer.start({ consumerTopic: userTopic })
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
