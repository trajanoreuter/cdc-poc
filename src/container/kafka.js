const { asFunction } = require('awilix')

const {
  kafka,
  createKafkaConsumer,
  schemaRegistry,
} = require('../kafka')

function register (container) {
  container.register({
    kafka: asFunction(kafka),
    createKafkaConsumer: asFunction(createKafkaConsumer),
    schemaRegistry: asFunction(schemaRegistry),
  })
}

module.exports = register
