function createKafkaConsumer ({
  kafka,
  schemaRegistry,
  logger,
  config,
}) {
  const {
    groupId,
    sessionTimeout,
    rebalanceTimeout,
    heartbeatInterval,
  } = config.kafka.app

  const consumer = kafka.consumer({
    groupId,
    sessionTimeout: Number(sessionTimeout),
    rebalanceTimeout: Number(rebalanceTimeout),
    heartbeatInterval: Number(heartbeatInterval),
  })

  const internalConfig = {
    topic: null,
  }

  async function start ({ consumerTopic }) {
    try {
      await consumer.connect()

      if (!consumerTopic) {
        throw new Error('Missing topic config')
      }

      internalConfig.topic = consumerTopic

      await consumer.subscribe({ topic: consumerTopic })

      const {
        partitionsConsumedConcurrently,
        autoCommitInterval,
        autoCommitThreshold,
      } = config.kafka.app

      consumer.run({
        partitionsConsumedConcurrently: Number(partitionsConsumedConcurrently),
        autoCommitInterval: Number(autoCommitInterval),
        autoCommitThreshold: Number(autoCommitThreshold),
        eachMessage: async ({ topic, partition, message }) => {
          const decodedKey = await schemaRegistry.decode(message.key)
          const decodedValue = await schemaRegistry.decode(message.value)

          logger.info({
            message: 'Reading messages from kafka',
            topic,
            partition,
            receivedKey: decodedKey,
            receivedMessage: decodedValue,
          })
        },
      })
    } catch (error) {
      logger.error({
        message: 'Failed to start kafka consumer',
        internalConfig,
        error: error.message,
        stack: error.stack,
      })

      throw error
    }
  }

  async function stop () {
    try {
      await consumer.disconnect()
    } catch (error) {
      logger.error({
        message: 'Failed to stop kafka consumer',
        internalConfig,
        error: error.message,
        stack: error.stack,
      })

      throw error
    }
  }

  return {
    start,
    stop,
  }
}

module.exports = createKafkaConsumer
