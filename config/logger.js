require('../dotenv')

const {
  LOGGER_LEVEL,
  LOGGER_TYPE,
} = process.env

const logger = {
  logLevel: LOGGER_LEVEL,
  logType: LOGGER_TYPE,
}

module.exports = logger
