const log4js = require('log4js')

function appLogger ({ config }) {
  const log4jsConfig = {
    appenders: {
      appFile: {
        alwaysIncludePattern: true,
        daysToKeep: 30,
        filename: 'logs/app.log',
        layout: { type: 'json' },
        type: 'dateFile',
      },
      console: {
        layout: { type: 'colored' },
        type: 'stdout',
      },
    },
    categories: {
      'cdc-poc': {
        appenders: [config.logger.logType],
        level: config.logger.logLevel,
      },
      default: {
        appenders: ['console'],
        level: 'ALL',
      },
    },
  }

  const jsonLayout = () => (logEvent) => logEvent.data.map((data) => JSON.stringify({
    time: logEvent.startTime,
    level: logEvent.level.levelStr,
    category: logEvent.categoryName,
    data,
  })).join('\n')

  log4js.addLayout('json', jsonLayout)
  log4js.configure(log4jsConfig)

  return log4js.getLogger(config.app.name)
}

module.exports = appLogger
