const kafka = require('./kafka')
const createKafkaConsumer = require('./consumer')
const schemaRegistry = require('./schema-registry')

module.exports = {
  kafka,
  createKafkaConsumer,
  schemaRegistry,
}
