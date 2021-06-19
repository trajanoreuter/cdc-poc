require('../dotenv')

const {
  AWS_REGION,
} = process.env

const aws = {
  region: AWS_REGION,
}

module.exports = aws
