const { createContainer } = require('awilix')

const aws = require('./aws')
const config = require('./config')
const database = require('./database')
const logger = require('./logger')
const validator = require('./validator')
const kafka = require('./kafka')
const application = require('./app/index')
const users = require('./app/users')
const repositories = require('./repositories')

const rawModules = [
  aws,
  config,
  database,
  logger,
  validator,
  kafka,
  application,
  users,
  repositories,
]

const container = createContainer()

function registerAllModules () {
  rawModules.forEach((rawModule) => rawModule(container))
}

registerAllModules()

module.exports = container
