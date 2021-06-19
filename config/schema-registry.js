require('../dotenv')

const {
  SCHEMA_REGISTRY_HOST,
} = process.env

const schemaRegistry = {
  host: SCHEMA_REGISTRY_HOST,
}

module.exports = schemaRegistry
