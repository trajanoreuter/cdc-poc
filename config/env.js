const { NODE_ENV } = process.env

const env = NODE_ENV
const isProd = env === 'production'

module.exports = {
  env,
  isProd,
}
