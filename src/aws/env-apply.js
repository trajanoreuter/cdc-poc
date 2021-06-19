const AWS = require('aws-sdk')
const fs = require('fs')

function envApply ({ config, logger }) {
  const { env } = config
  const { name: app } = config.app

  const configPathList = [
    './config/environment',
  ]

  const secretCharacters = 5

  async function applyFromAWS () {
    logger.info({
      message: 'Running env apply for AWS',
      app,
      env,
    })

    const { region } = config.aws

    const ssm = new AWS.SSM({
      region,
    })

    function getParametersRecursive (params, result = []) {
      return ssm.getParametersByPath(params)
        .promise()
        .then((SSMResult) => {
          const { Parameters, NextToken } = SSMResult
          if (NextToken) {
            return getParametersRecursive(
              {
                ...params,
                NextToken,
              },
              [
                ...result,
                ...Parameters,
              ],
            )
          }
          return [
            ...result,
            ...Parameters,
          ]
        })
    }

    async function getParameters (params) {
      const Parameters = await getParametersRecursive(params)
      const result = Parameters
        .map((parameter) => ({
          name: parameter.Name.split('/').pop(),
          value: parameter.Value,
          used: false,
        }))

      return result
    }

    function printSecret (value) {
      const lengthToHide = Math.max(1, value.length - secretCharacters)
      return value.replace(value.substring(0, lengthToHide), '*'.repeat(lengthToHide))
    }

    const flatten = (list) => [].concat(...list)
    const isBoolean = (value) => value === 'true' || value === 'false'
    const isArray = (value) => value.startsWith('[') && value.endsWith(']')
    const isNumber = (value) => /^\d+\.?\d*$/.exec(value)
    const isRawValue = (value) => isBoolean(value)
      || isArray(value)
      || isNumber(value)

    async function setupEnvs () {
      const envsCdcPocApp = await getParameters({
        Path: `/cdc-poc/${env}/envs`,
        WithDecryption: true,
      })

      const envsArray = envsCdcPocApp

      const files = flatten(configPathList
        .map((configPath) => fs.readdirSync(configPath)
          .map((fileName) => `${configPath}/${fileName}`)
          .filter((fileName) => fs.statSync(fileName).isFile())))

      files.forEach((filePath) => {
        let fileContent = fs.readFileSync(filePath, 'utf8')

        envsArray.forEach(({ name, value }, index) => {
          const key = name.toUpperCase()
          const expression = new RegExp(`"__${key}__"`, 'g')

          if (expression.test(fileContent)) {
            envsArray[index].used = true
            logger.info({
              message: 'SSM key/value',
              key,
              value: `${printSecret(value)}`,
            })

            if (isRawValue(value)) {
              fileContent = fileContent.replace(expression, `${value}`)
            } else {
              fileContent = fileContent.replace(expression, `"${value}"`)
            }
          }
        })

        fs.writeFileSync(filePath, fileContent, 'utf8')
      })

      const unusedEnvs = envsArray
        .filter((environment) => !environment.used)
        .map(({ name }) => `- ${name.toUpperCase()}`)

      logger.info({
        message: 'List of defined NOT used variables at SSM Parameter Store',
        unusedEnvs: unusedEnvs.join('\n'),
      })
    }

    try {
      await setupEnvs()
    } catch (error) {
      logger.error({
        message: 'Error setting environment variables',
        error: error.message,
        stack: error.stack,
      })

      throw error
    }
  }

  return {
    applyFromAWS,
  }
}

module.exports = envApply
