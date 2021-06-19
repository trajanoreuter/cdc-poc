require('../dotenv')

const {
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env

const database = {
  database: DATABASE_NAME,
  dialect: 'postgres',
  host: DATABASE_HOST,
  password: DATABASE_PASSWORD,
  seederStorage: 'sequelize',
  username: DATABASE_USERNAME,
}

module.exports = database
