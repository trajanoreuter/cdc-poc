const { Kafka } = require('kafkajs')

function createKafka ({ config, logger }) {
  try {
    const ssl = config.kafka.ssl ? { ssl: config.kafka.ssl } : {}

    const endpoints = config.kafka.endpoints.split(',')

    const kafka = new Kafka({
      brokers: endpoints,
      ...ssl,
      retry: {
        maxRetryTime: Number(config.kafka.maxRetryTime),
        initialRetryTime: Number(config.kafka.initialRetryTime),
        retries: Number(config.kafka.retries),
      },
    })

    return kafka
  } catch (error) {
    logger.error({
      message: 'Cannot instance kafka',
      error: error.message,
      stack: error.stack,
    })

    throw error
  }
}

module.exports = createKafka
