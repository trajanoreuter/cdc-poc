const app = require('./app')
const logger = require('./logger')
const env = require('./env')
const database = require('./database')
const aws = require('./aws')
const kafka = require('./kafka')
const schemaRegistry = require('./schema-registry')

const config = {
  ...env,
  database,
  app,
  logger,
  aws,
  kafka,
  schemaRegistry,
}

module.exports = config
