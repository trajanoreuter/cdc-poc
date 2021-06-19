const Sequelize = require('sequelize')
const rawModels = require('./models')

function postgresDatabase ({ config, logger }) {
  const sequelizeConfig = {
    database: config.database.database,
    define: {
      createdAt: 'created_at',
      timestamps: true,
      updatedAt: 'updated_at',
    },
    dialect: config.database.dialect,
    host: config.database.host,
    logging: false,
    password: config.database.password,
    pool: {
      acquire: 20000,
      handleDisconnects: true,
      idle: 60000,
    },
    username: config.database.username,
  }

  const database = new Sequelize(sequelizeConfig)

  function setupDatabase () {
    const defineInstance = (model) => ({
      model,
      instance: model.define(database),
    })

    Object.values(rawModels)
      .map(defineInstance)
  }

  try {
    logger.info({ message: 'Initializing database' })
    setupDatabase()
    logger.info({ message: 'Database initialized' })
  } catch (error) {
    logger.error({
      message: 'Cannot initialized database',
      error: error.message,
      stack: error.stack,
    })

    throw error
  }

  async function start () {
    try {
      logger.info({ message: 'Attempting database authentication' })
      await database.authenticate()
      logger.info({ message: 'Database authentication successful' })
    } catch (error) {
      logger.error({
        message: 'Cannot authenticate',
        error: error.message,
        stack: error.stack,
      })

      throw error
    }
  }

  async function stop () {
    try {
      logger.info({ message: 'Stopping database' })
      await database.stop()
      logger.info({ message: 'Database stopped' })
    } catch (error) {
      logger.error({
        message: 'Cannot stop database',
        error: error.message,
        stack: error.stack,
      })

      throw error
    }
  }

  return {
    start,
    stop,
    sequelize: database,
  }
}

module.exports = postgresDatabase
