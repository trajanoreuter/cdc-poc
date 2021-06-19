const { resolve } = require('path')
const dotenv = require('dotenv')

const { env } = require('./config/env')

const validEnvs = [
  'production',
  'development',
  'test',
]

if (!validEnvs.includes(env)) {
  throw new Error(`Incorrect environment '${env}'. Possible values are: ${validEnvs.join(', ')}`)
}

const envFile = resolve(__dirname, 'config', 'environment', env)

dotenv.config({
  path: envFile,
})
